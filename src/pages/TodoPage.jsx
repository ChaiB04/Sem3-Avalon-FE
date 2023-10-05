import React, { useState } from "react";
import InputItem from '../components/InputItem';
import TodoList from '../components/TodoList';

function TodoPage() {

    // This data is only present for demo purposes. Usually you obtain this through the backend.
    const todoItemsData = [
        {
            id: 1,
            title: "Do groceries",
            done: true
        },
        {
            id: 2,
            title: "Clean bathroom",
            done: false
        },
        {
            id: 3,
            title: "Dispose thrash",
            done: true
        },
    ]

    const [todoItems, setToDoItems] = useState(todoItemsData);

    const addItem = title => {
        const newItem = {
            id: 4,
            title: title,
            done: false
        };
        setToDoItems([...todoItems, newItem]);
    }

    return (
        <div className="container">
            <div className="inner">
                <InputItem addItem={addItem} />
                <TodoList todoItems={todoItems} />
            </div>
        </div>
    )
}

export default TodoPage;