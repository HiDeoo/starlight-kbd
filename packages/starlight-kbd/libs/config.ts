import { AstroError } from 'astro/errors'
import { z } from 'astro/zod'

const configSchema = z
  .object({
    // TODO(HiDeoo) comment
    globalPicker: z.boolean().default(true),
    // TODO(HiDeoo) comment
    // TODO(HiDeoo) name? types? platform?
    types: z
      .array(
        z.object({
          // TODO(HiDeoo) comment
          id: z.string(),
          // TODO(HiDeoo) comment
          // TODO(HiDeoo) label i18n
          label: z.string(),
          // TODO(HiDeoo) comment
          default: z.boolean().default(false),
        }),
      )
      .min(1)
      .refine(
        (value) => value.filter((type) => type.default).length === 1,
        // TODO(HiDeoo) Update message when the name is updated
        { message: 'The `types` array must contain exactly one default type.' },
      ),
  })
  .transform((value) => ({
    ...value,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    defaultType: value.types.find((type) => type.default)!.id,
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
