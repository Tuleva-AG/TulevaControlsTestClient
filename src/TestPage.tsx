import { useEffect, useState } from 'react';
import './App.css';
import { HeaderColumn, HoursPage } from '@tuleva-ag/tuleva-controls-test';
import TestEditor, { ITestItem } from './TestEditor';
import Utils from './utils';

function TestPage() {

    const [itemsState, setItemsState] = useState(new Array<ITestItem>());
    const [sortState, setSortState] = useState<string>('id');
    const [sortDescendingState, setSortDescendingState] = useState<boolean>(true);

    useEffect(() => {
        let items: ITestItem[] = [
            { id: "1", subject: "Wert 1", description: "A - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae neque! Corporis distinctio atque natus ea molestias in doloribus, ratione eius, tenetur aliquam saepe aspernatur dicta rem voluptas error nam." },
            { id: "2", subject: "Wert 2", description: "B - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae neque! Corporis distinctio atque natus ea molestias in doloribus, ratione eius, tenetur aliquam saepe aspernatur dicta rem voluptas error nam." },
            { id: "3", subject: "Wert 3", description: "E - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae neque! Corporis distinctio atque natus ea molestias in doloribus, ratione eius, tenetur aliquam saepe aspernatur dicta rem voluptas error nam." },
            { id: "4", subject: "Wert 4", description: "D - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae neque! Corporis distinctio atque natus ea molestias in doloribus, ratione eius, tenetur aliquam saepe aspernatur dicta rem voluptas error nam." },
            { id: "5", subject: "Wert 5", description: "F - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae neque! Corporis distinctio atque natus ea molestias in doloribus, ratione eius, tenetur aliquam saepe aspernatur dicta rem voluptas error nam." },
            { id: "6", subject: "Wert 6", description: "C - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae neque! Corporis distinctio atque natus ea molestias in doloribus, ratione eius, tenetur aliquam saepe aspernatur dicta rem voluptas error nam." }
        ]

        setItemsState(items);
    }, [])

    const addNew: () => void = (): void => {
        let items: ITestItem[] = itemsState;
        let newItem: ITestItem = {
            subject: '',
            id: `New_${new Date().getTime()}`,
            description: ''
        };
        items.unshift(newItem);
        setItemsState([...items]);
    };

    const onDelete: (id: string | undefined) => Promise<void> = async (id: string | undefined): Promise<void> => {
        if (id) {
            setItemsState([...itemsState.filter((item: ITestItem): boolean => item.id !== id)]);
        }
    };

    const onExit: (testItem: ITestItem) => void = (testItem: ITestItem) => {
        let items: ITestItem[] = itemsState;
        setItemsState([...items.filter((item: ITestItem): boolean => item.id !== testItem.id)]);
    };

    async function onSave(testItem: ITestItem, id: string | undefined): Promise<void> {
        if (id !== undefined) {
            let brandNew: ITestItem[] = itemsState;
            let newTestItem: ITestItem = { ...testItem };
            if (newTestItem.id?.startsWith("New_")) {
                newTestItem.id = new Date().getTime().toString();
            }
            brandNew[brandNew.findIndex((b) => b.id === id)] = newTestItem;
            setItemsState([...brandNew]);
        }
    }

    const renderViewer: (item: ITestItem) => JSX.Element = (item: ITestItem): JSX.Element => {
        return (
            <>
                <div>{item.subject}</div>
                <div>{item.description}</div>
            </>
        );
    };

    const renderEditor: (item: ITestItem) => JSX.Element = (item: ITestItem): JSX.Element => {
        return (
            <>
                <TestEditor item={item}></TestEditor>
            </>
        );
    };

    const handleSortClick = (sortField: string, sortDescending: boolean): void => {
        setSortState(sortField);
        setSortDescendingState(sortDescending);
    };

    const renderListHeader: () => JSX.Element = (): JSX.Element => {
        return (
            <>
                <HeaderColumn
                    sortField='subject'
                    sortDescending={sortDescendingState}
                    sortState={sortState}
                    onClick={(sortField: string, sortDescending: boolean) => handleSortClick(sortField, sortDescending)}>
                    {"Subject"}
                </HeaderColumn>
                <HeaderColumn
                    sortField='description'
                    sortDescending={sortDescendingState}
                    sortState={sortState}
                    onClick={(sortField: string, sortDescending: boolean) => handleSortClick(sortField, sortDescending)}>
                    {"Description"}
                </HeaderColumn>
            </>
        );
    };

    const renderFilter: () => JSX.Element = (): JSX.Element => {

        return (
            <>

            </>
        );
    };

    return (
        <div className="Page">


            <HoursPage
                dataSource={Utils.sortItems(itemsState, sortState, sortDescendingState)}
                loading={false}
                onAddNew={addNew}
                onDelete={(id) => onDelete(id)}
                onExit={() => (item: ITestItem) => onExit(item)}
                onSave={(item, id) => onSave(item as ITestItem, id)}
                onRenderView={(item) => renderViewer(item as ITestItem)}
                onRenderEdit={(item) => renderEditor(item as ITestItem)}
                onRenderListHeader={() => renderListHeader()}
                onRenderFilter={() => renderFilter()}
                // createRights={Rights.News.Create}
                // deleteRights={Rights.News.Delete}
                // editRights={Rights.News.Edit}
                // listRights={Rights.News.List}
                caption={"Tests"}
                helpTopic='news'
                showAsModal={true}
                hideCopyButton={true}
            ></HoursPage>

        </div>
    );
}

export default TestPage;
