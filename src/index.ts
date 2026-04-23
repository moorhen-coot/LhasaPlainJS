import { createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { LhasaEmbedder, type LhasaEmbedderProps } from 'lhasa-ligand-builder'
import cssText from 'lhasa-ligand-builder/style.css?inline'

let cssInjected = false

function injectCssOnce(): void {
  if (cssInjected) return
  cssInjected = true
  const style = document.createElement('style')
  style.setAttribute('data-lhasa-plainjs', '')
  style.textContent = cssText
  document.head.appendChild(style)
}

/// Documentation for each prop is found in the lhasa-ligand-builder package, in the LhasaComponentProps type.
export interface CreateLhasaOptions {
  assetsBaseUrl?: string
  show_top_panel?: boolean
  show_footer?: boolean
  icons_path_prefix?: string
  rdkit_molecule_pickle_list?: { pickle: string; id: string }[]
  name_of_host_program?: string
  send_to_host_program_callback?: (
    internal_id: number,
    id_from_prop: string | null,
    smiles: string,
    rdkit_pickle_base64: string
  ) => void
  bansu_endpoint?: string
  bansu_callback?: (internal_id: number, id_from_prop: string | null, cif_text: string) => void;
  data_path_prefix?: string
  dark_mode?: boolean
  max_width?: number | null
  max_height?: number | null
}

export interface LhasaInstance {
  destroy: () => void
}

export function createLhasa(
  container: HTMLElement,
  options: CreateLhasaOptions = {},
): LhasaInstance {
  if (!(container instanceof HTMLElement)) {
    throw new Error(
      'createLhasa: first argument must be an HTMLElement. '
      + `Received: ${typeof container}`,
    )
  }

  injectCssOnce()

  const props: LhasaEmbedderProps = {
    assetsBaseUrl: options.assetsBaseUrl,
    show_top_panel: options.show_top_panel,
    show_footer: options.show_footer,
    icons_path_prefix: options.icons_path_prefix,
    rdkit_molecule_pickle_list: options.rdkit_molecule_pickle_list,
    name_of_host_program: options.name_of_host_program,
    send_to_host_program_callback: options.send_to_host_program_callback,
    bansu_endpoint: options.bansu_endpoint,
    bansu_callback: options.bansu_callback,
    data_path_prefix: options.data_path_prefix,
    dark_mode: options.dark_mode,
    max_width: options.max_width,
    max_height: options.max_height,
  }

  const root: Root = createRoot(container)
  root.render(createElement(LhasaEmbedder, props))

  return {
    destroy(): void {
      root.unmount()
    },
  }
}
