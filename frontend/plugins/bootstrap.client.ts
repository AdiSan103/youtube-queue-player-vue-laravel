import * as bootstrap from 'bootstrap'

export default defineNuxtPlugin(() => {
  /** Modal Instance */

  const instanceModal = (id: string) =>
    bootstrap.Modal.getOrCreateInstance(`#${id}`)

  // const instanceOffcanvas = (id: string) =>
  //   bootstrap.Offcanvas.getOrCreateInstance(`#${id}`)

  // const instanceTooltip = (id: string) =>
  //   bootstrap.Tooltip.getOrCreateInstance(`#${id}`)

  // const instancePopOver = (id: string, options?: bootstrap.Popover.Options) =>
  //   bootstrap.Popover.getOrCreateInstance(`#${id}`, options)

  interface Instance {
    show: Function
    hide: Function
    dispose: Function
    toggle: Function
  }

  // interface TooltipInstance {
  //   show: Function
  //   hide: Function
  //   dispose: Function
  //   toggle: Function
  //   setContent: Function
  // }

  const modal: Instance = {
    show(id: string) {
      instanceModal(id).show()
    },
    hide(id: string) {
      instanceModal(id).hide()
    },
    dispose(id: string) {
      instanceModal(id).dispose()
    },
    toggle(id: string) {
      instanceModal(id).toggle()
    }
  }

  // const offcanvas: Instance = {
  //   show(id: string) {
  //     instanceOffcanvas(id).show()
  //   },
  //   hide(id: string) {
  //     instanceOffcanvas(id).hide()
  //   },
  //   dispose(id: string) {
  //     instanceOffcanvas(id).dispose()
  //   },
  //   toggle(id: string) {
  //     instanceOffcanvas(id).toggle()
  //   }
  // }

  // const tooltip: TooltipInstance = {
  //   show(id: string) {
  //     instanceTooltip(id).show()
  //   },
  //   hide(id: string) {
  //     instanceTooltip(id).hide()
  //   },
  //   dispose(id: string) {
  //     instanceTooltip(id).dispose()
  //   },
  //   toggle(id: string) {
  //     instanceTooltip(id).toggle()
  //   },
  //   setContent(id: string, content: object) {
  //     instanceTooltip(id).setContent({ ...content })
  //   }
  // }

  // const popover: Instance = {
  //   show(id: string, options?: bootstrap.Popover.Options) {
  //     instancePopOver(id, options).show()
  //   },
  //   hide(id: string, options?: bootstrap.Popover.Options) {
  //     instancePopOver(id, options).hide()
  //   },
  //   dispose(id: string, options?: bootstrap.Popover.Options) {
  //     instancePopOver(id, options).dispose()
  //   },
  //   toggle(id: string, options?: bootstrap.Popover.Options) {
  //     instancePopOver(id, options).toggle()
  //   }
  // }
  /** End of Modal Instance */

  return {
    provide: {
      bootstrap,
      bModal: modal,
      // bOffcanvas: offcanvas,
      // bTooltip: tooltip,
      // bPopover: popover
    }
  }
})
