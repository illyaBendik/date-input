import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, it, expect } from "vitest";
import DateInput from "@/components/DateInput.vue";

describe("DateInput.vue", () => {
  it('renders correct placeholder in "en-US" locale', async () => {
    Object.defineProperty(global.navigator, "language", {
      value: "en-US",
      writable: true,
    });
    const wrapper = await mountSuspended(DateInput, {
      props: {
        modelValue: "",
      },
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe("MM/DD/YYYY");
  });
  it("Renders correct placeholder if locale other then 'en-US' ", async () => {
    Object.defineProperty(global.navigator, "language", {
      value: "ru",
      writable: true,
    });
    const wrapper = await mountSuspended(DateInput, {
      props: {
        modelValue: "",
      },
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe("DD/MM/YYYY");
  });
  it("Format value according to locales other than 'en-US'.", async () => {
    Object.defineProperty(global.navigator, "language", {
      value: "ru",
      writable: true,
    });
    const wrapper = await mountSuspended(DateInput, {
      props: {
        modelValue: "2022-03-12",
      },
    });
    await wrapper.vm.$nextTick();
    const input = wrapper.find("input");
    expect(input.element.value).toBe("12/03/2022");
  });
  it("Format value according to en-US locale", async () => {
    Object.defineProperty(global.navigator, "language", {
      value: "en-US",
      writable: true,
    });
    const wrapper = await mountSuspended(DateInput, {
      props: {
        modelValue: "2022-03-12",
      },
    });
    await wrapper.vm.$nextTick();
    const input = wrapper.find("input");
    expect(input.element.value).toBe("03/12/2022");
  });
  it("Emits correct formatted date on input", async () => {
    const wrapper = await mountSuspended(DateInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find("input");
    await input.setValue("12/31/2023");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("2023-12-31");
  });
});
