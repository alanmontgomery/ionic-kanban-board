import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { checkmarkSharp, chevronBackSharp } from 'ionicons/icons';
import { useState } from 'react';
import { useParams } from 'react-router';
import { SettingsStore } from '../store';
import { addItem } from '../store/SettingsStore';

const Add = () => {

    const categories = SettingsStore.useState(s => s.categories);
    const types = SettingsStore.useState(s => s.types);
    const router = useIonRouter();
    const { category_id = false } = useParams();

    const useFormInput = (initialValue = "") => {

        const [ value, setValue ] = useState(initialValue);

        const onChange = e => {

            setValue(e.target.value);
        }

        return {

            value,
            onIonChange: onChange,
        }
    }

    const formFields = [

        {
            fields: {

                type: "text",
                id: "name",
                placeholder: "Enter a name...",
            },
            state: useFormInput(),
            label: "Name",
            options: false
        },
        {
            fields: {

                type: "select",
                id: "category_id",
                placeholder: "Select a category",
            },
            state: useFormInput(parseInt(category_id)),
            label: "Category",
            options: categories
        },
        {
            fields: {

                type: "select",
                id: "type_id",
                placeholder: "Select a type...",
            },
            state: useFormInput(),
            label: "Type",
            options: types
        },
        {
            fields: {

                type: "textarea",
                id: "summary",
                placeholder: "Enter a summary...",
            },
            state: useFormInput(),
            label: "Summary",
            options: false
        }
    ];

    const add = () => {

        const data = [];

        formFields.forEach(field => {

            data[field.fields.id] = field.state.value;
        });

        addItem(data);
        router.goBack();
    }

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
                        <IonButton onClick={ () => router.goBack() }>
                            <IonIcon icon={ chevronBackSharp } />
                        </IonButton>
					</IonButtons>
					<IonTitle>Add Item</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Add Item</IonTitle>
					</IonToolbar>
				</IonHeader>

                { formFields.map((formField, index) => {

                    const { state, fields, label, options } = formField;

                    return (

                        <IonItem lines="none" key={ index } className="input">
                            <IonLabel position="floating">
                                { label }
                            </IonLabel>

                            { fields.type === "text" && <IonInput { ...fields } { ...state } /> }
                            { fields.type === "textarea" && <IonTextarea { ...fields } { ...state } /> }
                            { fields.type === "select" && 
                                <IonSelect { ...fields } { ...state }>
                                    { options.map(option => {

                                        const optionName = option.name.charAt(0).toUpperCase() + option.name.slice(1);

                                        return (
                                            <IonSelectOption value={ parseInt(option.id) } key={ option.id }>
                                                { optionName }
                                            </IonSelectOption>
                                        );
                                    })}
                                </IonSelect> 
                            }
                        </IonItem>
                    );
                })}

                <IonButton color="success" expand="block" style={{ margin: "1rem" }} onClick={ add }>
                    <IonIcon icon={ checkmarkSharp } />&nbsp;
                    Save
                </IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Add;