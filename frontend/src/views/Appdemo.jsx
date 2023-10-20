import React, { useState, useEffect } from "react";
import { Grid, Container, Divider, CardMedia, List, ListItem, ListItemText } from "@mui/material";
import Typography from "@material-ui/core/Typography";

import theme from '../theme';
import {isMobile} from "react-device-detect";
import AppGrid1 from "../components/AppGrid1.jsx"
import WorkflowGrid from "../components/WorkflowGrid.jsx"
import CreatorGrid from "../components/CreatorGrid.jsx"
import DocsGrid from "../components/DocsGrid.jsx"
import Button from '@mui/material/Button';
import { useNavigate, Link } from "react-router-dom";

import { 
  Tabs,
	Paper,
  Tab,
} from "@material-ui/core";

import {
  Business as BusinessIcon,
	Apps as AppsIcon,
	Polymer as PolymerIcon,
	EmojiObjects as EmojiObjectsIcon,
  Description as DescriptionIcon,
} from "@material-ui/icons";


const bodyDivStyle = {
	margin: "auto",
	maxWidth: 1024,
	scrollX: "hidden",
	overflowX: "hidden",
}

// Should be different if logged in :|
const Appdemo = (props) => {
  const { globalUrl, isLoaded, serverside, userdata, hidemargins, } = props;
  const [appCategory,setAppCategory] = useState();
 	let navigate = useNavigate();

  const [curTab, setCurTab] = useState(0);
  const iconStyle = { marginRight: 10 };

	useEffect(() => {
		if (serverside !== true && window.location.search !== undefined && window.location.search !== null) {
			const urlSearchParams = new URLSearchParams(window.location.search)
			const params = Object.fromEntries(urlSearchParams.entries())
			const foundTab = params["tab"]
			if (foundTab !== null && foundTab !== undefined) {
				for (var key in Object.keys(views)) {
					const value = views[key]
					console.log(key, value)
					if (value === foundTab) {
						setConfig("", key)
						break
					}
				}
			}
		}
	}, [])

	if (serverside === true) {
		return null
	}

	const boxStyle = {
		color: "white",
		flex: "1",
		marginLeft: 10,
		marginRight: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 30,
		paddingTop: hidemargins === true ? 0 : 30,
		display: "flex", 
		flexDirection: "column",
		overflowX: "hidden",
		minHeight: 400,
	}
    const NoArguments_NoReturn = () => {
 
        alert('Function Called...');
     
      }
    const SideBar = {
        minWidth: 250,
        maxWidth: 300,
        borderRight: "1px solid rgba(255,255,255,0.3)",
        left: 0,
        position: "sticky",
        minHeight: "90vh",
        maxHeight: "90vh",
        overflowX: "hidden",
        overflowY: "auto",
        zIndex: 1000,
        color: "white"
    };
    const catItems = (
        <div style={SideBar}>
            <List>
                <ListItem >
                    <ListItemText>
                        <span><Typography variant="primary">Categories</Typography></span>
                    </ListItemText>
                </ListItem>
                <span></span>
                <Divider />
                <ListItem>
                    <ListItemText>
                        <Button id="ASSETS" variant="primary" onClick={()=>{setAppCategory("assets")}}>
                            ASSETS
                        </Button>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Button variant="primary" onClick={()=>{setAppCategory("cases")}}>
                            CASES
                        </Button>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Button variant="primary" onClick={()=>{setAppCategory("comms")}}>
                            COMMS
                        </Button>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Button variant="primary" onClick={()=>{setAppCategory("edr av")}}>
                            EDR & AV
                        </Button>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Button variant="primary" onClick={()=>{setAppCategory("iam")}}>
                            IAM
                        </Button>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Button variant="primary" onClick={()=>{setAppCategory("intel")}}>
                            INTEL
                        </Button>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Button variant="primary" onClick={()=>{setAppCategory("network")}}>
                            NETWORK
                        </Button>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        <Button variant="primary" onClick={()=>{setAppCategory("siem")}}>
                            SIEM
                        </Button>
                    </ListItemText>
                </ListItem>
            </List>
        </div>
)

	const views = {
    0: "apps",
    1: "workflows",
    2: "docs",
    3: "creators",
  }

	const setConfig = (event, inputValue) => {
		const newValue = parseInt(inputValue)

    setCurTab(newValue)
    if (newValue === 0) {
      document.title = "Gsoc2 - search - apps";
    } else if (newValue === 1) {
      document.title = "Gsoc2 - search - workflows";
    } else if (newValue === 2) {
      document.title = "Gsoc2 - search - documentation";
    } else if (newValue === 3) {
      document.title = "Gsoc2 - search - creators";
    } else {
      document.title = "Gsoc2 - search";
    }

		
		const urlSearchParams = new URLSearchParams(window.location.search)
		const params = Object.fromEntries(urlSearchParams.entries())
		const foundQuery = params["q"]
		var extraQ = ""
		if (foundQuery !== null && foundQuery !== undefined) {
			extraQ = "&q="+foundQuery
		}

	
		if ((serverside === false || serverside === undefined) && window.location.pathname.includes("/search")) {
			navigate(`/search?tab=${views[newValue]}`+extraQ)
		}
  }

	if (isLoaded === false) {
		return null
	}


	// Random names for type & autoComplete. Didn't research :^)
	const landingpageDataBrowser = 
		<div style={{paddingBottom: hidemargins === true ? 0 : 100, color: "white", backgroundColor: theme.palette.surfacColor}}>
			<div style={boxStyle}>
				<Tabs
					style={{width: 610, margin: "auto", marginTop: hidemargins === true ? 0 : 25, }}
					value={curTab}
					indicatorColor="primary"
					textColor="secondary"
					onChange={setConfig}
					aria-label="disabled tabs example"
				>
					<Tab
						label=<span>
							<AppsIcon style={iconStyle} /> Apps
						</span>
					/>
					
				</Tabs>
				{curTab === 0 ? 
					<AppGrid1 maxRows={3} showSuggestion={true} globalUrl={globalUrl} isMobile={isMobile} userdata={userdata} searchValue={appCategory} key={appCategory} />
				: 
				curTab === 1 ?
    			window.location.pathname === "/search" ? 
						<WorkflowGrid maxRows={3} showSuggestion={true} globalUrl={globalUrl} isMobile={isMobile}  userdata={userdata} /> 
						:
						<WorkflowGrid maxRows={3} showSuggestion={true} globalUrl={globalUrl} isMobile={isMobile}  userdata={userdata} />
				:
				curTab === 2 ?
					<DocsGrid maxRows={6} parsedXs={12} showSuggestion={true} globalUrl={globalUrl} isMobile={isMobile}  userdata={userdata} />
				: 
				curTab === 3 ?
					<CreatorGrid parsedXs={4} showSuggestion={true} globalUrl={globalUrl} isMobile={isMobile}  userdata={userdata} />
				: 
				null}
			</div>
		</div>
	//{/*alternativeView={true} />*/}

	const loadedCheck = isLoaded ? 
		<div>
			<div style={bodyDivStyle}>{landingpageDataBrowser}</div>
		</div>
		:
		<div>
		</div>

	// #1f2023?
	return(
		<div style={{backgroundColor: "#1f2023", display: "flex"}}>
            {catItems}
			{loadedCheck}
		</div>
	)
}

export default Appdemo;