<template>
  <p>Current mask: {{ currentMask }}</p>
  <input
    :value="value"
    maxlength="10"
    :placeholder="currentMask"
    @input="onInput"
  />
</template>

<script setup lang="ts">
const DEFAULT_MASK = "DD/MM/YYYY";
const EN_US_MASK = "MM/DD/YYYY";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    outputFormat?: string;
  }>(),
  {
    outputFormat: "YYYY-MM-DD",
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", val: string): void;
}>();

const { $time } = useNuxtApp();
const { isEnUsLocale } = useBrowserLocale();

const currentMask = computed(() =>
  isEnUsLocale.value ? EN_US_MASK : DEFAULT_MASK
);

const value = computed(() => {
  if (
    props.modelValue &&
    $time(props.modelValue, props.outputFormat, true).isValid()
  ) {
    return $time(props.modelValue).format(currentMask.value);
  }
});

const _onPressBackspace = (value: string) => {
  if (value.length === 2 || value.length === 5) {
    return value.slice(0, -1);
  }
  if (value.length >= 3 && !value.includes("/")) {
    return value.substring(0, 2) + "/" + value.substring(2);
  } else if (value.length >= 6 && value.split("/").length !== 3) {
    if (value[2] !== "/") {
      return value.substring(0, 2) + "/" + value.substring(2);
    } else if (value[5] !== "/") {
      return value.substring(0, 5) + "/" + value.substring(5);
    }
  }
  return value;
};

const _addAutoSlash = (value: string) => {
  const len = value.length;
  if (len === 2 || len === 5) {
    value += "/";
  }
  return value;
};

const _filterNoNumeric = (value: string) => value.replace(/[^\d/]/g, "");

const _updateModelValue = (value: string) => {
  const isValid = $time(value, currentMask.value, true).isValid();
  if (isValid) {
    const formattedValue = $time(value, currentMask.value).format(
      props.outputFormat
    );
    emit("update:modelValue", formattedValue);
  }
};

const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value;

  value = _filterNoNumeric(value);

  if ((event as InputEvent).inputType === "deleteContentBackward") {
    value = _onPressBackspace(value);
  } else {
    value = _addAutoSlash(value);
  }

  input.value = value;

  _updateModelValue(value);
};
</script>
<style>
input {
  display: block;
  padding: 0.625rem;
  border-radius: 0.5rem;
  border-width: 2px;
  border-color: #d1d5db;
  width: 500px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #111827;
  background-color: #f9fafb;
}
</style>
