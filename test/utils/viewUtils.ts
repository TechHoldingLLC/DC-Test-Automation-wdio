export async function isMobileView(): Promise<boolean> {
  const size = await browser.getWindowSize();
  return size.width <= 768; // You can fine-tune the breakpoint
}
