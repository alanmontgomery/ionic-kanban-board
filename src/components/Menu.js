import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { addOutline, addSharp, barChartOutline, barChartSharp, bookmarkOutline, listOutline, listSharp } from 'ionicons/icons';
import './Menu.css';

import { SettingsStore } from '../store';
import { handleViewChange } from '../store/SettingsStore';

const appPages = [
	{
		title: 'Add Item',
		url: '/page/add/0',
		iosIcon: addOutline,
		mdIcon: addSharp
	}
];

const actions = [

	{
		title: 'Board View',
		slug: "Board",
		url: false,
		onClick: () => handleViewChange("Board"),
		iosIcon: barChartOutline,
		mdIcon: barChartSharp
	},
	{
		title: 'List View',
		slug: "List",
		url: false,
		onClick: () => handleViewChange("List"),
		iosIcon: listOutline,
		mdIcon: listSharp
	}
];

const Menu = () => {

	const location = useLocation();
	const view = SettingsStore.useState(s => s.view);

	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list">
					<IonListHeader>Welcome back</IonListHeader>
					<IonNote>Ionic Kanban Board</IonNote>
					{ appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem className={ view === appPage.slug ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
									<IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>

				<IonList id="inbox-list">
					<IonListHeader>Toggle View</IonListHeader>
					<IonNote>View items in list or board view</IonNote>

						{ actions.map((action, index) => {
							return (
								<IonMenuToggle key={index} autoHide={false}>
									<IonItem className={ view === action.slug ? 'selected' : '' } onClick={ action.onClick } lines="none" detail={false}>
										<IonIcon slot="start" ios={action.iosIcon} md={action.mdIcon} />
										<IonLabel>{action.title}</IonLabel>
									</IonItem>
								</IonMenuToggle>
							);
						})}
				</IonList>
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
