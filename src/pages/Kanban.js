import { IonButton, IonButtons, IonCardSubtitle, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonReorder, IonReorderGroup, IonSlide, IonSlides, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { addOutline, copyOutline, createOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BoardItem } from '../components/Board/BoardItem';
import { ListItem } from '../components/Board/ListItem';
import { SettingsStore } from '../store';

import styles from "./Kanban.module.scss";

const Kanban = () => {

    const view = SettingsStore.useState(s => s.view);
    const categories = SettingsStore.useState(s => s.categories);
    const types = SettingsStore.useState(s => s.types);
    const items = SettingsStore.useState(s => s.items);

    const [ moveToggled, setMoveToggled ] = useState(view === "Board" ? true : false);
    const [ categoryItems, setCategoryItems ] = useState([]);

    useEffect(() => {
        
        setCategoryItems(items);
    }, [ items ]);

    const handleReorder = e => {

        //  In a real world, production app
        //  In here we could re-arrange and sort array of items
        //  To be in sync with our state or simply save the new main array

        e.detail.complete();
    }

    const handleMove = (e, direction, fromCategoryID, toCategoryID, itemID) => {

        const fromIndex = categoryItems.findIndex(c => c.id === fromCategoryID);
        const toIndex = categoryItems.findIndex(c => c.id === toCategoryID);

        const tempCategoryItems = [ ...categoryItems ];
        const itemIndex = categoryItems[fromIndex].items.findIndex(i => i.id === itemID);
        const itemElement = document.querySelector(`#item_${ fromCategoryID }_${ itemIndex }`);

        const tempItem = { ...categoryItems[fromIndex].items[itemIndex] };
        tempCategoryItems[toIndex].items.push(tempItem);

        itemElement.classList.add(`animate__slideOut${ direction }`);

        setTimeout(() => {
            
            itemElement.classList.remove(`animate__slideOut${ direction }`);
            tempCategoryItems[fromIndex].items.splice(itemIndex, 1);
            setCategoryItems(tempCategoryItems);
        }, 700);
    }

    useIonViewDidEnter(() => {

        document.querySelector("#slider") && document.querySelector("#slider").update();
    });

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{ view } View</IonTitle>
                    { view === "Board" &&
                        <IonButtons slot="end">
                            <IonButton slot="end" onClick={ () => setMoveToggled(!moveToggled) }>
                                <IonIcon icon={ !moveToggled ? copyOutline : createOutline } />
                            </IonButton>
                        </IonButtons>
                    }
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">{ view } View</IonTitle>
					</IonToolbar>
				</IonHeader>

                <IonSlides id="slider" options={{ slidesPerView: "auto", zoom: true, grabCursor: true }}>
                    { categoryItems.map(({ items, id }, index) => {

                        const name = categories.filter(c => c.id === id)[0].name;

                        return (

                            <IonSlide key={ index } className={ styles.categorySlide }>
                                
                                <IonCardSubtitle className={ view === "Board" ? styles.categoryName : styles.categoryNameList }>{ name } ({ items.length })</IonCardSubtitle>

                                <IonReorderGroup disabled={ moveToggled } onIonItemReorder={ handleReorder } className={ view === "List" ? styles.listReorder : "" }>
                                    { items.map((item, index) => {

                                        const type = types.filter(t => t.id === item.typeID)[0];

                                        return (

                                            <IonReorder key={ index }>
                                                { view === "Board" && <BoardItem id={ id } index={ index } item={ item } type={ type } moveToggled={ moveToggled } handleMove={ handleMove } /> }
                                                { view === "List" && <ListItem id={ id } index={ index } item={ item } type={ type } moveToggled={ moveToggled } handleMove={ handleMove } /> }
                                            </IonReorder>
                                        );
                                    })}
                                </IonReorderGroup>
                                
                                <Link to={ `/page/add/${ id }` } className={ styles.itemAdd }>
                                    <IonIcon icon={ addOutline } />
                                </Link>
                            </IonSlide>
                        );
                    })}
                </IonSlides>
			</IonContent>
		</IonPage>
	);
};

export default Kanban;