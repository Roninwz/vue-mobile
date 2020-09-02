<template>
  <svg
    class="svg-icon"
    :style="iconStyle"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
  export default {
    name: 'IconSvg',
    props: {
      iconClass: {
        type: String,
        required: true
      },
      iconStyle: {
        type: String,
        default: ''
      },
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`;
      }
    }
  };
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
