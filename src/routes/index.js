import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  // Redirect
} from "react-router-dom";
// import Home from '../containers/Home';
// import Dashboard from '../containers/Dashboard';
// import SuccessConfirmation from '../containers/SuccessConfirmation';
const menu = [
  {
    path: "/",
    exact: true,
    type: "single",
    lazyComponent: React.lazy(() => import('../containers/Home'))
  },
  {
    path: "/success-confirmation",
    exact: false,
    type: "single",
    lazyComponent: React.lazy(() => import("../containers/SuccessConfirmation"))
  },
  {
    path: "/item/:id",
    exact: false,
    type: "single",
    lazyComponent: () => (
      <>child item id</>
    )
  },
  {
    path: "/dashboard",
    initial: "dashboard",
    type: "nested",
    exact: false,
    nested: [
      {
        path: "/dashboard",
        initial: "index",
        type: "single",
        exact: true,
        lazyComponent: React.lazy(() => import('../containers/Dashboard'))
      },
      {
        path: "/dashboard/images",
        initial: "images",
        type: "single",
        exact: false,
        lazyComponent: () => (
          <>child dashboard primary</>
        )
      },
      {
        path: "/dashboard/:params",
        initial: "params",
        type: "single",
        exact: false,
        lazyComponent: () => (
          <>child dashboard params</>
        )
      },
    ]
  }
];

const Navbar = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/dashboard">Dashboard</Link>
    </li>
  </ul>
)

function RouteWithSubRoutes({ component: Component, ...rest }) {
  return (
    <div>
      <Navbar/>
      <React.Suspense fallback={"loading..."}>
        <Route
          {...rest}
          render={(props) => {
            // if(rest.authed){
              if(rest.routeType === "single"){
                return (
                  // <Main>
                    <Component {...props} />
                  // </Main>
                )
              }
              if(rest.routeType === "nested"){
                return RouteWithNestedRoutes(rest)
              }
            // }else{
            //   return <Redirect to="/login" />
            // }
          }}
        />
      </React.Suspense>
    </div>
  );
}

function RouteWithNestedRoutes(rest){
  return(
    <Switch>
      { PrivateNestedRouteLoop(rest) }
      <Route 
        render={(props) => <>not page found</>} 
      />
    </Switch>
  )
}

const PrivateNestedRouteLoop = ( rest ) => {
  return rest.nestedRoute.map((menu, menuIndex) => (
    <Route 
      {...rest}
      key={menuIndex} 
      exact={menu.exact} 
      path={menu.path} 
      render={(props) => <menu.lazyComponent {...props} />}
    />
  ))
}

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        {menu && menu.map((menu, index) => (
          <RouteWithSubRoutes
            key={`${index + 1}${menu}`}
            // exact
            exact={menu.exact}
            // authed={user.authed}
            routeType={menu.type}
            nestedRoute={menu.nested}
            path={menu.path}
            component={menu.lazyComponent}
          />
        ))}
        <Route 
          render={(props) => (
            <>not page found</>
          )} 
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;