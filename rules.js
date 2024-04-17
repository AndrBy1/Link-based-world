class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); //# TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story", this.engine.storyData.InitialLocation);
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); //# TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; //# TODO: use `key` to get the data object for the current story location
        
        this.engine.show(locationData.Body); //# TODO: replace this text by the Body of the location data
        
        if(typeof locationData.Choices != 'undefined' && locationData.Choices != null && locationData.Choices.length > 0) { //? TODO: check if the location has any Choices
            
            
            for(let choice of locationData.Choices) { //? TODO: loop over the location's Choices
                if(key == "obtain"){
                    this.engine.storyData.Key = true;
                }
                
                this.engine.addChoice(choice.Text, choice); //? TODO: use the Text of the choice
                //? TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                if(key == "Mars"){
                    
                    if(this.engine.storyData.Key == false){
                        
                        this.engine.addChoice("Radio", this.engine.storyData.NoKey);
                    }
                    else{
                        
                        this.engine.addChoice("Go Forward", this.engine.storyData.GotKey);
                    }
                }
            }
            
        }
        else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');