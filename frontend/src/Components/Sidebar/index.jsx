import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CallAPI from "../../Utils/callApi";
import RouteParser from "../../Utils/RouteParser";


const Sidebar = () => {
    const [expandedItem, setExpandedItem] = useState();
    const [userData, setUserData] = useState();
    const [routes, setRoutes] = useState([]);
    const currentPath = useLocation().pathname;

    useEffect(() => {
        console.log((currentPath))
        if (!routes.find(r => r.subMenu?.some(sr => sr.route === currentPath)))
            setExpandedItem("");
        //setUserDataHandler();
    }, [currentPath]);

    useEffect(() => {
        setScreenRoutes();
    }, [userData]);

    const setUserDataHandler = async () => {
        const _data = await CallAPI('user/GetUser');
        setUserData(prev => _data);
    }


    const setScreenRoutes = () => {
        const _routes = [];

        if (userData && userData.userScreens) {
            let parent = false;

            userData.userScreens.forEach(s => {
                parent = s.parentId === -1;
                if (parent) {
                    const submenuItems = userData.userScreens.filter(d => d.parentId === s.id);
                    console.log(submenuItems)
                    const subMenu = [];

                    subMenu.push(
                        ...submenuItems.map(sm => {
                            const {route,icon} = RouteParser(sm.config);
                            return {
                                name: sm.name,
                                route,
                                icon: <i className={icon}></i>,
                                type: 1
                            }
                        })
                    );

                    const { route, icon } = RouteParser(s.config);

                    _routes.push({
                        name: s.name,
                        route,
                        icon: <i className={icon}></i>,
                        type: 2,
                        subMenu: subMenu
                    });
                }
                else if(s.parentId===0){
                    const { route, icon } = RouteParser(s.config);

                    _routes.push({
                        name: s.name,
                        route,
                        icon: <i className={icon}></i>,
                        type: 1,
                        subMenu: null
                    });
                }
            });
        }
        setRoutes(_routes);
    }

    useEffect(()=> {

        setRoutes([
            {
                name: "Dashboard",
                route: "/",
                icon: <i className="fas fa-gauge icon"></i>,
                type: 1,
                subMenu: null
            },
            {
                name: "General",
                route: "/",
                icon: <i className="fas fa-home icon"></i>,
                type: 2,
                subMenu: [
                    {
                        name: "Campus",
                        route: "/listCampus",
                        icon: <i className="fas fa-home icon"></i>,
                        type: 1,
                        subMenu: null
                    },
                    {
                        name: "Faculties",
                        route: "/listFaculty",
                        icon: <i className="fas fa-book icon"></i>,
                        type: 1,
                        subMenu: null
                    },
                    {
                        name: "Departments",
                        route: "/listDepartment",
                        icon: <i className="fas fa-building icon"></i>,
                        type: 1,
                        subMenu: null
                    },
                    {
                        name: "Sections",
                        route: "/listSection",
                        icon: <i className="fas fa-door-open icon"></i>,
                        type: 1,
                        subMenu: null
                    },
                ]
            },
            
            {
                name: "Budget",
                route: "/budget",
                icon: <i className="fas fa-coins icon"></i>,
                type: 2,
                subMenu: [
                    {
                        name: "List",
                        route: "/listBudget",
                        icon: <i className="fas fa-bars icon"></i>,
                        type: 1
                    },
                    {
                        name: "New",
                        route: "/newBudget",
                        icon: <i className="fas fa-plus icon"></i>,
                        type: 1
                    }
                ]
            },
            {
                name: "Employees",
                route: "/employees",
                icon: <i className="fas fa-user icon"></i>,
                type: 2,
                subMenu: [
                    {
                        name: "List",
                        route: "/listEmployee",
                        icon: <i className="fas fa-bars icon"></i>,
                        type: 1
                    },
                    {
                        name: "Add",
                        route: "/addEmployee",
                        icon: <i className="fas fa-plus icon"></i>,
                        type: 1
                    },
                    {
                        name: "Edit",
                        route: "/editEmployee",
                        icon: <i className="fas fa-pen-to-square icon"></i>, 
                        type: 1
                    }
                ],
            },
        ]);
    },[]);


    const expandItem = (selectedRoute) => {
        if (selectedRoute === expandedItem) setExpandedItem("");
        else setExpandedItem(selectedRoute)
    }

    return (
        <div className="sidebar-content">
            <div className="title">
                <h1>Finanace App</h1>
                <div className="seperator"></div>
            </div>
            <ul className="nav-items">
                {
                    routes.map((route, i) => {
                        if (route.type === 1)
                            return <li key={route.name} className={currentPath === route.route ? "active" : ""}>
                                <Link to={route.route}>
                                    {route.icon}
                                    <span>{route.name}</span>
                                </Link>
                            </li>
                        else
                            return (<li key={route.name} className={expandedItem === route.name ? "expand" : ""}>
                                <div className="btn-expandable" onClick={(e) => expandItem(route.name)}>
                                    {route.icon}
                                    <span className="w-100">{route.name}</span>
                                    <i className="fas fa-chevron-right icon icon-sm"></i>
                                </div>
                                <div className="sub-menu">
                                    <ul className="m-0">
                                        {route.subMenu && route.subMenu.map(sm =>
                                            <li key={sm.name} className={currentPath === sm.route ? "active" : ""}>
                                                <Link to={sm.route}>
                                                    {sm.icon}
                                                    <span>{sm.name}</span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </li>)
                    }
                    )
                }
            </ul>
        </div>
    );
}

export default Sidebar;