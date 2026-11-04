import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const markup = readFileSync("public/tradebase/contact.html", "utf8");
const script = readFileSync("public/tradebase/script.js", "utf8");

describe("TradeBase contact form", () => {
  beforeEach(() => {
    document.body.innerHTML = markup.slice(markup.indexOf("<body>") + 6, markup.indexOf("</body>"));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("posts to the configured Formspree endpoint", () => {
    const form = document.querySelector<HTMLFormElement>("#contact-form");
    expect(form?.action).toBe("https://formspree.io/f/xwllyvwz");
    expect(form?.method).toBe("post");
  });

  it.each(["success", "non-ok", "network"])("handles a %s submission and restores the button", async (outcome) => {
    const fetchMock = vi.fn();
    let resolveRequest: (value: { ok: boolean }) => void = () => {};
    let rejectRequest: (error: Error) => void = () => {};
    fetchMock.mockReturnValue(new Promise((resolve, reject) => {
      resolveRequest = resolve;
      rejectRequest = reject;
    }));
    vi.stubGlobal("fetch", fetchMock);
    window.eval(script);
    const form = document.querySelector<HTMLFormElement>("#contact-form");
    const name = document.querySelector<HTMLInputElement>("#f-name");
    const button = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!form || !name || !button) throw new Error("Missing contact controls");
    name.value = "Integration test";
    const event = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(button.disabled).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith("https://formspree.io/f/xwllyvwz", {
      method: "POST", body: expect.any(FormData), headers: { Accept: "application/json" },
    });
    if (outcome === "network") rejectRequest(new Error("Offline"));
    else resolveRequest({ ok: outcome === "success" });
    await vi.waitFor(() => expect(button.disabled).toBe(false));
    expect(name.value).toBe(outcome === "success" ? "" : "Integration test");
    if (outcome !== "success") {
      expect(document.querySelector("#form-status a")?.getAttribute("href")).toContain("wa.me/233246699008");
    }
  });
});