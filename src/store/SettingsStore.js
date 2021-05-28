import { arrowUpOutline, bugOutline, flashOutline, keyOutline } from "ionicons/icons";
import { Store } from "pullstate";

const SettingsStore = new Store({
    
    view: "Board",
    filter: "",
    types: [
        {
            id: 1,
            name: "bug",
            color: "#ec1111",
            icon: bugOutline
        },
        {
            id: 2,
            name: "improvement",
            color: "#0bbe28",
            icon: arrowUpOutline
        },
        {
            id: 3,
            name: "enhancement",
            color: "#680bbe",
            icon: flashOutline
        },
        {
            id: 4,
            name: "task",
            color: "#0b7ebe",
            icon: keyOutline
        }
    ],
    categories: [
        { id: 1, name: "To Do" },
        { id: 2, name: "In Progress" },
        { id: 3, name: "Done" }
    ],
    items: [

        {
            id: 1,
            items: [
                {
                    id: 1,
                    name: "Adding projects",
                    summary: "Give users the option to add projects and add items to projects",
                    labels: ["CSS", "Design", "Framework"],
                    typeID: 3
                },
                {
                    id: 2,
                    name: "Add filter by labels",
                    summary: "Add the option to filter items by labels on the board to give the user more control",
                    labels: ["Filtering", "Labels"],
                    typeID: 2
                },
                {
                    id: 3,
                    name: "Can't move items after add",
                    summary: "When the user adds a new item, for some reason, it breaks the ability to move items across categories",
                    labels: ["Move", "Array", "Object", "Broke"],
                    typeID: 1
                },
                {
                    id: 4,
                    name: "Hook a database up",
                    summary: "Link app to a database like MongoDB or Firebase for sync and save",
                    labels: ["Database", "MongoDB", "Firebase"],
                    typeID: 4
                },
                {
                    id: 5,
                    name: "Add a remove option",
                    summary: "Allow the user to remove items from list and board views",
                    labels: ["Remove", "Delete", "Item"],
                    typeID: 1
                }
            ]
        },
        {
            id: 2,
            items: [
                {
                    id: 1,
                    name: "Add a list view",
                    summary: "Allow users to view items on boards in a list view",
                    labels: ["Kanban", "List", "View"],
                    typeID: 3
                },
                {
                    id: 2,
                    name: "Write some fake tickets",
                    summary: "Fill out this app with some fake, real looking tickets",
                    labels: ["Tickets", "Todo", "Items"],
                    typeID: 4
                }
            ]
        },
        {
            id: 3,
            items: [
                {
                    id: 1,
                    name: "Fix bug with IonSlide",
                    summary: "When navigating to the add screen, and coming back, the slides are stuck",
                    labels: ["Ionic", "Slides", "Stuck"],
                    typeID: 1
                },
                {
                    id: 2,
                    name: "Add slick features",
                    summary: "Add the ability to move cards or items from one category to another, still using IonSlides and IonReorder",
                    labels: ["Ionic", "IonSlides", "IonReorder"],
                    typeID: 2
                },
                {
                    id: 3,
                    name: "Drag and drop items",
                    summary: "Give the user the ability to drag and drop items while still maintaining click functionality and propagation within the item itself",
                    labels: ["DND", "Drag", "Drop", "Main feature"],
                    typeID: 4
                }
            ]
        }
    ]
});

export default SettingsStore;

export const addItem = (item) => {

    console.log(item);

    SettingsStore.update(s => {

        const tempItems = [ ...s.items ];
        const itemCategoryIndex = tempItems.findIndex(t => parseInt(t.id) === parseInt(item.category_id));

        console.log({ itemCategoryIndex });

        tempItems[itemCategoryIndex].items.push({
            
            name: item.name,
            summary: item.summary,
            typeID: item.type_id,
            labels: ["test", "test1", "test2", "test3"]
        });

        s.items = tempItems;
    });
}

// export const removeFromCart = coffeeIndex => {

//     SettingsStore.update(s => { s.coffee_ids.splice(coffeeIndex, 1) });
// }

export const handleViewChange = view => {

    SettingsStore.update(s => { s.view = view });
}