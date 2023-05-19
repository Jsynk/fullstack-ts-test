import React from 'react';
import { observer } from "mobx-react-lite";
import { store } from "../store/store";
import Nav from '../components/Nav';

const Home: React.FunctionComponent = observer(() => (
    <div>
        <div className='container mx-auto p-2'>
            <Nav />
        </div>
        <hr />
        <div className='container mx-auto p-2'>
            <div className="form-control p-2">
                <label className="label">
                    <span className="label-text text-lg font-bold">Search for giphys</span>
                </label>
                <div className="input-group">
                    <input data-type="account-id" className='input input-bordered w-full max-w-xs'
                    placeholder='Type here...'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            store.setSearch(e.target.value)
                        } />
                    <button className="btn btn-square bi-search"
                        disabled={!store.searchValid}
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                            store.getImages()
                        }></button>
                </div>
            </div>

            {store.images?.length ? 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {store.images.map((img, index)=>{return (
                <div key={'card'+index}>
                    <div className="indicator">
                        <div className="indicator-item indicator-middle indicator-center">
                            <button className={"btn btn-primary " + (img.isFav ? 'bi-star-fill': 'bi-star')} 
                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                                store.toggleFavorite(img)
                            }></button>
                        </div> 
                    </div>
                    <img className='w-full h-full object-cover' src={img.url} alt=""/>
                </div>
                )})}
            </div>
            : ''}
            
        </div>
    </div>
));

export default Home;
