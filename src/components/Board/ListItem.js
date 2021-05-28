import { IonIcon, IonItem, IonLabel, IonReorder } from "@ionic/react";

import styles from "../../pages/Kanban.module.scss";

export const ListItem = ({ id, item, index, type, moveToggled, handleMove }) => (

	<IonItem id={ `item_${ id }_${ index }` } key={ `item_${ id }_${ index }` } lines="none" className={ `${ styles.kanbanItemList } animate__animated` }>
		<IonReorder>
			<div className={ styles.itemList }>
				<IonLabel>
					<h3>{ item.name }</h3>
					<p className="ion-text-wrap">{ item.summary }</p>
				</IonLabel>
				<IonIcon icon={ type.icon } style={{ color: type.color }} />
			</div>
		</IonReorder>
	</IonItem>
);