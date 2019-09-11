<template>
  <div>

    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
    AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
    RQfiDBUAHR4wDAv6AAABgUlEQVQ4y53TTyhEURTH8d8zI3+K8iekaGSjRrGwoGRhYyWxsrFiQSmR
    sGClpJRmx8hupCxsJEnsZGGpplmoKaRISoiZmnwtZuaN8a43OGdzz7v3887tdZ6FjOFRQG+ak3kb
    U5ZwAMAmHtO+iTRwASwRAnYp+A3q4J4YQwiLAHBCSS40yDsPdNr1PHBO5c/IYoEPIjRmHRkjQYQ6
    MypkGzimDGf3OFc0OVEVZ8AaXuPX7OGVB9qykZ8oCSaNIJntPPJMdwb18MQLvS5EiGZuidGfROMk
    uKY1BxHCxyUJhpEFkvZ0p6gCiss9qnWoFs2KTMy49ilgliA7fIBXlj2EvtSqSFOqT61vtJLqP6Hl
    dEOv4RJbGvhSlWtKkuST0g3yHKRNA1qXlcojjarm+xEn6pO0aleLKtKIJCnfDVVIurSrU0m1kqRi
    N/SL+AuK/QfF/4OM17NynC11oqi6XPu+f3mpPVvTwD5BwpA1cxAmyAavnDt/dw8he3SzUTIu8Kef
    fQJ+NrfwocYkAgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMi0yMFQxNjoyOTozMCswODowMNR9
    VxMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTItMjBUMTY6Mjk6MzArMDg6MDClIO+vAAAAGXRF
    WHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==" alt="">
    <!--<svg-->
      <!--:class="{'is-active':isActive}"-->
      <!--t="1492500959545"-->
      <!--class="hamburger"-->
      <!--style=""-->
      <!--viewBox="0 0 1024 1024"-->
      <!--version="1.1"-->
      <!--xmlns="http://www.w3.org/2000/svg"-->
      <!--p-id="1691"-->
      <!--xmlns:xlink="http://www.w3.org/1999/xlink"-->
      <!--width="64"-->
      <!--height="64"-->
      <!--@click="toggleClick">-->
      <!--<path-->
        <!--d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"-->
        <!--p-id="1692"/>-->
      <!--<path-->
        <!--d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"-->
        <!--p-id="1693"/>-->
      <!--<path-->
        <!--d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"-->
        <!--p-id="1694"/>-->
    <!--</svg>-->
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
  img{
    margin-left: 20px;
    vertical-align: middle;
  }
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
  transition: .38s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
