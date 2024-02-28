import React, { Component } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from "react-color";


const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// class NewPaletteForm extends Component {

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "teal",
      newColorName: "",
      colors: [{color: "blue", name:"blue"}],
      newPaletteName: ""
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    ValidatorForm.addValidationRule('isColorNameUnique', value => 
      this.state.colors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', value => 
      this.state.colors.every(
        ({color}) => color !== this.state.currentColor
      )
    );
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
      this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

    handleDrawerOpen = () => {
      this.setState({ open: true});
    };

    handleDrawerClose = () => {
      this.setState({open: false});
    };
    updateCurrentColor(newColor){
      this.setState({currentColor: newColor.hex})
    }
    addNewColor(){
      const newColor = {
        color: this.state.currentColor, 
        name: this.state.newColorName
      };
      this.setState({colors: [...this.state.colors, newColor], newColorName: ""})
    }
    handleChange(evt){
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
    handleSubmit(){
      let newName = this.state.newPaletteName;
      const newPalette = {
        paletteName: newName,
        id: newName.toLowerCase().replace(/ /g, "-"), 
        colors: this.state.colors
      };
      this.props.savePalette(newPalette);
      this.props.history.push("/");
    }
    removeColor(colorName){
      this.setState({
        colors: this.state.colors.filter(color => color.name !== colorName)
      })
    }

    render(){
      // const theme = useTheme();
      const { open, colors } = this.state;
      return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" color="default" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Persistent drawer
              </Typography>
              <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator 
              label="Palette Name" 
              value={this.state.newPaletteName} 
              name= "newPaletteName"
              onChange= {this.handleChange} 
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
              />
              <Button 
              variant="contained" 
              color="primary"
              type="submit"
              >
                Save Palette
              </Button>
              </ValidatorForm>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Typography variant="h4">
              Design Your Palette
            </Typography>
            <div>
            <Button variant="contained" color="secondary">Clear Palette</Button>
            <Button variant="contained" color="primary">Random Color</Button>
            </div>
            <ChromePicker 
            color={this.state.currentColor} 
            onChangeComplete={this.updateCurrentColor} 
            />
            <ValidatorForm onSubmit={this.addNewColor}>
              <TextValidator 
              value={this.state.newColorName} 
              name="newColorName"
              onChange={this.handleChange} 
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={[
                'Enter a color name',
                'Color name must be unique', 
                'Color already used!'
              ]}
              />
              <Button 
                variant="contained" 
                type= "submit"
                color="primary" 
                style={{backgroundColor: this.state.currentColor}} 
                >
                Add Color
              </Button>
            </ValidatorForm>
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            {this.state.colors.map(color =>(
             <DraggableColorBox 
             key = {color.name}
             color={color.color} 
             name={color.name} 
             handleClick={() => this.removeColor(color.name)}
            />
              ))}         
          </Main>
        </Box>
      );
    }
  }

export default NewPaletteForm;
