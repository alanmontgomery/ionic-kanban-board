import { IonBadge, IonIcon, IonItem, IonLabel, IonReorder } from "@ionic/react";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";

import styles from "../../pages/Kanban.module.scss";

export const BoardItem = ({ id, item, index, type, moveToggled, handleMove }) => (

	<IonItem id={ `item_${ id }_${ index }` } key={ `item_${ id }_${ index }` } lines="none" className={ `${ styles.kanbanItem } animate__animated` }>
		<div>
			<div className={ styles.itemList }>
				<IonLabel>

					<div className={ styles.itemTitle }>
						<h3>{ item.name }</h3>
						<IonBadge style={{ backgroundColor: type.color }} className={ styles.itemType }>
							<IonIcon icon={ type.icon } />&nbsp;{ type.name }
						</IonBadge>
					</div>
					<p className="ion-text-wrap">{ item.summary }</p>
				</IonLabel>
			</div>
			<div className={ styles.itemLabels }>
					{ item.labels.map((label, index2) => {

						return (
							<span key={ index2 }>
								<IonBadge color="primary">{ label }</IonBadge>
								&nbsp;&nbsp;
							</span>
						);
					})}
				</div>

				<div className={ styles.itemActions }>
					{ id !== 1 && moveToggled && 
						<div className={ styles.moveLeft } onClick={ e => handleMove(e, "Left", id, id - 1, item.id) }>
							<IonIcon icon={ arrowBackOutline } />
						</div>
					}

					{ id !== 3 && moveToggled && 
						<div className={ styles.moveRight } onClick={ e => handleMove(e, "Right", id, id + 1, item.id) }>
							<IonIcon icon={ arrowForwardOutline } />
						</div>
					}
				</div>
			</div>
	</IonItem>
);