import { useNavigate } from "@solidjs/router"
import { createForm, setValues, SubmitHandler } from "@modular-forms/solid"
import { TextInput } from "../forms-component/TextInput"
import { Checkbox } from "../forms-component/Checkbox"
import { ParticipantInfo } from "../../binding/ParticipantInfo"
import { Select } from "../forms-component/Select"
import { FileInput } from "../forms-component/FileInput"
import { getParticipant, patchParticipantInfo } from "../../request/routes"
import { createEffect } from "solid-js"
import { t } from "../../stores/locale"

export function AdditionalInfoForm() {
    const navigate = useNavigate()
    const [loginForm, { Form, Field }] = createForm<ParticipantInfo>()

    const handleSubmit: SubmitHandler<ParticipantInfo> = async (
        values,
        event,
    ) => {
        event.preventDefault()
        const response = await patchParticipantInfo(values)
        if (response && response.status == 201) {
            navigate("/dashboard")
        } else {
            console.log(response)
        }
    }

    createEffect(async () => {
        const id = localStorage.getItem("id")
        if (!id) return
        const response = await getParticipant(id)
        if (!response.error) {
            const participant = response as ParticipantInfo
            setValues(loginForm, participant)
        }
    })

    return (
        <Form
            class="flex w-1/2 flex-col space-y-6"
            action="#"
            method="post"
            onSubmit={handleSubmit}
        >
            <Field name="medical_conditions">
                {(field, props) => (
                    <TextInput
                        {...props}
                        value={field.value || ""}
                        error={field.error}
                        label={t("additionalInfo.medicalConditionsLabel")}
                        type="text"
                        placeholder={t("additionalInfo.medicalConditions")}
                    />
                )}
            </Field>

            <Field name="allergies">
                {(field, props) => (
                    <TextInput
                        {...props}
                        value={field.value || ""}
                        error={field.error}
                        label={t("additionalInfo.allergiesLabel")}
                        type="text"
                        placeholder={t("additionalInfo.allergies")}
                    />
                )}
            </Field>

            <Field name="pronouns">
                {(field, props) => (
                    <TextInput
                        {...props}
                        value={field.value || ""}
                        error={field.error}
                        label={t("additionalInfo.pronounsLabel")}
                        type="text"
                        placeholder={t("additionalInfo.pronouns")}
                    />
                )}
            </Field>

            <Field name="is_vegetarian" type="boolean">
                {(field, props) => (
                    <Checkbox
                        {...props}
                        checked={field.value || false}
                        error={field.error}
                        label={t("additionalInfo.vegetarianLabel")}
                    />
                )}
            </Field>

            <Field name="phone_number">
                {(field, props) => (
                    <TextInput
                        {...props}
                        value={field.value || ""}
                        error={field.error}
                        label={t("additionalInfo.phoneNumberLabel")}
                        type="text"
                        placeholder={t("additionalInfo.phoneNumber")}
                    />
                )}
            </Field>

            <Field name="tshirt_size">
                {(field, props) => (
                    <Select
                        {...props}
                        value={field.value || "m"}
                        error={field.error}
                        label={t("additionalInfo.tshirtSize")}
                        options={[
                            {
                                label: "XS",
                                value: "xs",
                            },
                            {
                                label: "S",
                                value: "s",
                            },
                            {
                                label: "M",
                                value: "m",
                            },
                            {
                                label: "L",
                                value: "l",
                            },
                            {
                                label: "XL",
                                value: "xl",
                            },
                            {
                                label: "2XL",
                                value: "xxl",
                            },
                        ]}
                    />
                )}
            </Field>

            <Field name="emergency_contact">
                {(field, props) => (
                    <TextInput
                        {...props}
                        value={field.value || ""}
                        error={field.error}
                        label={t("additionalInfo.emergencyContactLabel")}
                        type="text"
                        placeholder={t("additionalInfo.emergencyContact")}
                    />
                )}
            </Field>

            <Field name="has_monthly_opus_card" type="boolean">
                {(field, props) => (
                    <Checkbox
                        {...props}
                        error={field.error}
                        label={t("additionalInfo.hasMonthlyOpusCard")}
                    />
                )}
            </Field>

            <Field name="reduced_mobility">
                {(field, props) => (
                    <TextInput
                        {...props}
                        value={field.value || ""}
                        error={field.error}
                        label={t("additionalInfo.reducedMobilityLabel")}
                        type="text"
                        placeholder={t("additionalInfo.reducedMobility")}
                    />
                )}
            </Field>

            <Field name="study_proof" type="File">
                {(field, props) => (
                    <FileInput
                        {...props}
                        value={field.value}
                        error={field.error}
                        label={t("additionalInfo.studyProofLabel")}
                        accept="image/*,.pdf,.doc,.docx,.odt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                )}
            </Field>

            <Field name="photo" type="File">
                {(field, props) => (
                    <FileInput
                        {...props}
                        value={field.value}
                        error={field.error}
                        label={t("additionalInfo.photoLabel")}
                        accept="image/*"
                    />
                )}
            </Field>

            <Field name="cv" type="File">
                {(field, props) => (
                    <FileInput
                        {...props}
                        value={field.value}
                        error={field.error}
                        label={t("additionalInfo.cvLabel")}
                        accept=".pdf,.doc,.docx,.odt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                )}
            </Field>

            <Field name="comments">
                {(field, props) => (
                    <TextInput
                        {...props}
                        value={field.value || ""}
                        error={field.error}
                        label="Commentaires"
                        type="text"
                        placeholder="Commentaires"
                    />
                )}
            </Field>

            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-light-highlight px-5 py-4 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-light-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-highlight"
                >
                    Mettre à jour les renseignements personnels
                </button>
            </div>
        </Form>
    )
}
