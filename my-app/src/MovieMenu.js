import React, {Component} from 'react';
import logo from './logo.png'

class MovieMenu extends Component{
    render(){
        console.log(this.props.links);
        return(
            
            
             <nav className="menu">
                <h1>WonderWomen</h1>
           

            <div className="menu__right">
                <ul className="menu__list">
                    <li className="menu__list-item"><a className="menu__link menu__link--active" 
                    href="#">Home</a></li>
                    <li className="menu__list-item"><a className="menu__link" 
                    href="#">About</a></li>
                    <li className="menu__list-item"><a className="menu__link" 
                    href="#">Portfolio</a></li>
                    <li className="menu__list-item"><a className="menu__link" 
                    href="#">Contact</a></li>
                </ul>

                

               
            </div>
        </nav>
            
        
            
            
            );
    }
}

export default MovieMenu;