import React from 'react';
import { observer } from "mobx-react-lite";

const Nav: React.FunctionComponent = observer(() => (
    <div className='container mx-auto'>
        <div className="navbar bg-base-100">
            <a href='/' 
                className={"btn btn-ghost normal-case text-xl bi-house-fill"+(window.location.pathname==="/"?" btn-active":"")}>
                Home
            </a>
            <a href='/favorites' 
                className={"btn btn-ghost normal-case text-xl bi-star-fill"+(window.location.pathname==="/favorites"?" btn-active":"")}> 
                Favorites
            </a>
        </div>
    </div>
));

export default Nav;
