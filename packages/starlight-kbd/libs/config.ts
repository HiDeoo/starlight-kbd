import { AstroError } from 'astro/errors'
import { z } from 'astro/zod'

const configSchema = z
  .object({
    /**
     * Whether the global keyboard type picker, allowing users to switch between different keyboard types, should be
     * displayed.
     *
     * If set to `false`, the global keyboard type picker located next to the theme picker will not be displayed and
     * it's up to the user to render the `<KbdPicker>` component where needed. This can be useful if only one or a few
     * pages of your documentation use keyboard shortcuts.
     *
     * @default true
     */
    globalPicker: z.boolean().default(true),
    /**
     * Defines the available keyboard types that can be selected by the user.
     */
    types: z
      .array(
        z.object({
          /**
           * Unique identifier for the keyboard type that will be used to declare keyboard shortcuts.
           */
          id: z.string(),
          /**
           * Label displayed to the user in the keyboard type picker.
           *
           * The value can be a string, or for multilingual sites, an object with values for each different locale.
           * When using the object form, the keys must be BCP-47 tags (e.g. `en`, `ar`, or `zh-CN`).
           */
          label: z.union([z.string(), z.record(z.string())]),
          /**
           * Whether the keyboard type should be selected by default.
           *
           * Only one keyboard type can be set as default. If no default is set,
           * the plugin will attempt to autodetect the user's OS/browser.
           *
           * @default false
           */
          default: z.boolean().default(false),
        }),
      )
      .min(1)
      .refine((value) => value.filter((type) => type.default).length <= 1, {
        message: 'The `types` array must contain at most one default type.',
      }),
  })
  .transform((value) => ({
    ...value,
    defaultType: value.types.find((type) => type.default)?.id,
    // Note: We can't autodetect at build time since we don't know the user's OS
    // Autodetection happens client-side in the browser
  }))

export function validateConfig(userConfig: unknown): StarlightKbdConfig {
  const config = configSchema.safeParse(userConfig)

  if (!config.success) {
    const errors = config.error.flatten()

    throw new AstroError(
      `Invalid starlight-kbd configuration:

${errors.formErrors.map((formError) => ` - ${formError}`).join('\n')}
${Object.entries(errors.fieldErrors)
  .map(([fieldName, fieldErrors]) => ` - ${fieldName}: ${fieldErrors.join(' - ')}`)
  .join('\n')}
  `,
      `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/HiDeoo/starlight-kbd/issues/new/choose`,
    )
  }

  return config.data
}

export type StarlightKbdUserConfig = z.input<typeof configSchema>
export type StarlightKbdConfig = z.output<typeof configSchema>
