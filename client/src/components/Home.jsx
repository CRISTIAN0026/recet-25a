import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes, dietTypeFilter, orderAlphabetically, sortByHealthy } from '../redux/actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginated from './Paginated';
import SearchBar from './SearchBar';
import './Home.css'
import './Card.css'

let prevId = 1

export default function Home() {
    
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    const [currentPage, setPage] = useState(1);
    const [recipeForPage, setRecipeForPage] = useState(9);
    const [order, setOrder] = useState('')

    const indexOfLastRecipe = currentPage * recipeForPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipeForPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginated = (pageNumber) => {
        setPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes());
    },[dispatch])

    const handleClick = e => {
        e.preventDefault()
        dispatch(getRecipes())
    }

    const handleFilterDiets = (e) => {
        e.preventDefault()
        dispatch(dietTypeFilter(e.target.value))
        setPage(1)
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();                
        dispatch(orderAlphabetically(e.target.value))
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }
    
    function handleScoreSort(e) {
        e.preventDefault();                
        dispatch(sortByHealthy(e.target.value));
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    
    return(

        <div className='Home'>
        <h1 id='h1'>Cooking Recipes</h1>
        <div className='all'>
        <div id='return'>    
        <button onClick={e =>{handleClick(e)}} id='uno'>ALL RECIPES</button>
        </div>
        <Link to='/recipe'><button id='dos'>CREATE RECIPE</button></Link> 
        <select onChange={e => handleFilterDiets(e)} defaultValue='Select a diet' id='tres'>
            <option value='Select a diet' disabled >SELECT DIET</option>
                    <option value="gluten free">Gluten Free</option> 
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="dairy free">Dairy Free</option>
            </select>
            <select id='four' onChange={e => handleAlphabeticalSort(e)} defaultValue='A Z'>
            <option value='A Z' disabled>A Z</option>
                <option value='az'>Sort ascending</option>
                <option value='za'>Sort descending</option>
            </select>
            <select id='five' onChange={e => handleScoreSort(e)} defaultValue='Sort Healthy Score'>
                    <option value='Sort Healthy Score' disabled>SORT HEALTHY SCORE</option>
                    <option value="asc">From Min to Max</option>
                    <option value="desc">From Max to Min</option>
            </select>
            </div>
            <SearchBar/>
            <Paginated 
            recipeForPage={recipeForPage}
            allRecipes={allRecipes.length}
            paginated={paginated}
            /> 
            <div className='cards'>
                {
                currentRecipes?.map(e => {
                    return(
                    <div key={prevId++} className="card"> 
                        <Link to={'/home/' + e.id} id='link'>
                    <Card name={e.name} image={e.image ? e.image :'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/migrated/gastritis-dieta.jpg'} diets={e.diets ? e.diets : e.Diets[0].name} key={e.id}/>
                    </Link>
                    </div>
                )
            })
        }
        </div>
        </div>
    )
}


