import React from 'react';
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import SingleColorPalette from './SingleColorPalette'
import {generatePalette} from "./colorHelper";
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route 
          exact 
          path="/" 
          render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps} />}
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
