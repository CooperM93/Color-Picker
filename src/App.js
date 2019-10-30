import React from 'react';
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import SingleColorPalette from './SingleColorPalette'
import NewPalette from './NewPalette';
import {generatePalette} from "./colorHelper";
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      palettes: seedColors
    }
    this.savePalette = this.savePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  savePalette = (newPalette) => {
    this.setState({ palettes: [...this.state.palettes, newPalette ]})
  }
  render() {
    return (
      <Switch>
        <Route 
          exact
          path="/palette/new" render={(routeProps) => <NewPalette savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />}
        />
        <Route 
          exact 
          path="/" 
          render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />}
        />
        <Route 
          exact 
          path="/palette/:id" 
          render={routeProps => (
            <Palette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )} 
            />
          )}
        />
        <Route 
          exact
          path="/palette/:paletteId/:colorId" 
          render={routeProps => (
            <SingleColorPalette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )} 
              colorId={routeProps.match.params.colorId}
            />
          )} 
        />
      </Switch>
    );
  }
}

export default App;
