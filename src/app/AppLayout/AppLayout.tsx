import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  NavList,
  NavItem,
  Page,
  PageSidebar,
  SkipToContent,
  Masthead,
  MastheadToggle,
  PageToggleButton,
  MastheadMain,
  MastheadBrand,
  MastheadContent
} from '@patternfly/react-core';
import { routes } from '@app/routes';
import { BarsIcon } from '@patternfly/react-icons'
import LogoSummerCamp from '../../../assets/images/MCCSummerCamp.png'
import {getUserInfo} from "@app/utils/utils";
import {useEffect, useState} from "react";
import {UsernameDropdown} from "@app/AppLayout/UsernameDropdown";


interface IAppLayout {
  children: React.ReactNode;
}

// @ts-ignore
const Logo = (
  <React.Fragment>
    <img src={LogoSummerCamp} alt="Summercamp UI" className="icon-bar" width="100" height="20" />
  </React.Fragment>
  
);

const AppLayout: React.FunctionComponent<IAppLayout> = ({children}) => {

  // init
  useEffect(() => {
    getUserInfo().then(info => {
      setUserInfo(info);
    })

  }, []);


  const [userInfo, setUserInfo] = useState();
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);

  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
    onNavToggleMobile()
  }
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

  const displayName = userInfo == null ? "": userInfo.displayName


  // @ts-ignore
  const Header = (
      <Masthead>
        <MastheadToggle>
          <PageToggleButton
              variant="plain"
              aria-label="Global navigation"
              isNavOpen={isNavOpen}
              onNavToggle={onNavToggle}
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadMain>
          <MastheadBrand href="/" onClick={() => console.log('clicked logo')} target="_blank">
            {Logo}
          </MastheadBrand>
        </MastheadMain>
        <MastheadContent style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <UsernameDropdown username={displayName}/>
        </MastheadContent>
      </Masthead>
  );


  const Navigation = (
    <Nav id="nav-primary-simple">
      <NavList>
        {routes.map((route, idx) => {
          return route.label && (
            <NavItem key={`${route.label}-${idx}`} id={`${route.label}-${idx}`}>
              <NavLink exact={true} to={route.path} activeClassName="pf-m-current">{route.label}</NavLink>
            </NavItem>
          );
        })}
      </NavList>
    </Nav>
  );
  const Sidebar = (
    <PageSidebar
      nav={Navigation}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />
  );
  const PageSkipToContent = (
    <SkipToContent href="#primary-app-container">
      Skip to Content
    </SkipToContent>
  );

  return (
    <Page
      mainContainerId="primary-app-container"
      header={Header}
      sidebar={Sidebar}
      className="icon-bar"
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}>
      {children}
    </Page>
  );
}

export { AppLayout };
