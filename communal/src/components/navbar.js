import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Collapse, Navbar, NavbarToggler, NavbarBrand,
	Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
	DropdownMenu, DropdownItem, Button
} from 'reactstrap';
// if u need activeClassName attr, thus import NavLink as RRNavLink.
import { NavLink as RRNavLink } from 'react-router-dom';

// import brandImg from '../../img/logo.svg';
import { startLogout } from '../actions/auth';

export class AppNavBarCompo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<Navbar color="light" light expand="lg" className="fixed-top">
				<NavbarBrand to="/" activeClassName="active" tag={RRNavLink} exact>
					<img src="../../img/logo.svg" className="brand-navbar" alt="brand..." />
					Show_Case
				</NavbarBrand>
				<NavbarToggler onClick={() => this.toggle()} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="mx-auto" navbar>
						<NavItem>
							<NavLink to="/dashboard" activeClassName="active" tag={RRNavLink} exact>
								Expense_Dashboard
							</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Expense_CRUD
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									<NavLink to="/create" activeClassName="active" tag={RRNavLink}>
										Create
									</NavLink>
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>
									<NavLink to="/help" activeClassName="active" tag={RRNavLink}>
										Help
									</NavLink>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						<NavItem>
							<NavLink to="/inebriant" activeClassName="active" tag={RRNavLink}>
								Inebriant
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/health" activeClassName="active" tag={RRNavLink}>
								Health
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/cosmetic_hlDegate" activeClassName="active" tag={RRNavLink}>
								Cosmetic_N_HighLevelCompoDelegate
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/nestedInDecisionNCounter" activeClassName="active" tag={RRNavLink}>
								InDecision_And_Counter
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="/nestedBooksByParams" activeClassName="active" tag={RRNavLink}>
								Books_With_Params_Id
							</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								User_Status
							</DropdownToggle>
							<DropdownMenu right>
								{/* <DropdownItem>
									<NavLink to="/" activeClassName="active" tag={RRNavLink} exact>
										LogIn
									</NavLink>
								</DropdownItem>
								<DropdownItem divider /> */}
								<DropdownItem>
									<Button color="danger" block outline
                                        onClick={() => { this.props.startLogout(); }}
                                        className="rounded-0">
                                        LogOut
                                    </Button>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

/* const mapStateToProps = (state) => ({
}); */

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(null, mapDispatchToProps)(AppNavBarCompo);
