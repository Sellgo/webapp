import React from 'react';
import {NavIconType} from '../../../interfaces/Admin';
import {NAV_ICONS} from '../../../constants/AdminLayout';

import homeIcon from '../../../assets/images/homeIcon.svg';
import wholesaleIcon from '../../../assets/images/wholesaleIcon.svg';
import searchManagementIcon from '../../../assets/images/searchManagementIcon.svg';
import profitFinderIcon from '../../../assets/images/profitFinderIcon.svg';
import leadsTrackerIcon from '../../../assets/images/leadsTrackerIcon.svg';
import productResearchIcon from '../../../assets/images/productResearchIcon.svg';
import productDatabaseIcon from '../../../assets/images/productDatabaseIcon.svg';
import productTrackerIcon from '../../../assets/images/productTrackerIcon.svg';
import sellerResearchIcon from '../../../assets/images/sellerResearchIcon.svg';
import sellerDatabaseIcon from '../../../assets/images/sellerDatabaseIcon.svg';
import sellerMapIcon from '../../../assets/images/sellerMapIcon.svg';
import sellerInventoryIcon from '../../../assets/images/sellerFinder.svg';
import keywordResearchIcon from '../../../assets/images/keywordResearchIcon.svg';
import keywordReverseIcon from '../../../assets/images/keywordReverseIcon.svg';
import keywordDatabaseIcon from '../../../assets/images/keywordDatabaseIcon.svg';
import keywordTrackerIcon from '../../../assets/images/keywordTrackerIcon.svg';


interface Props {
    iconName: NavIconType;
}

const NavIcon = (props:Props) => {
    const { iconName } = props;
    let icon;
    switch (iconName) {
        case NAV_ICONS.HOME:
            icon = homeIcon;
            break;
            
        case NAV_ICONS.WHOLESALE_BULK_ANALYSIS:
            icon = wholesaleIcon;
            break;
            
        case NAV_ICONS.SEARCH_MANAGEMENT:
            icon = searchManagementIcon;
            break;
            
        case NAV_ICONS.PROFIT_FINDER:
            icon = profitFinderIcon;
            break;
            
        case NAV_ICONS.LEADS_TRACKER:
            icon = leadsTrackerIcon;
            break;
            
        case NAV_ICONS.PRODUCT_RESEARCH:
            icon = productResearchIcon;
            break;
            
        case NAV_ICONS.PRODUCT_DATABASE:
            icon = productDatabaseIcon;
            break;
            
        case NAV_ICONS.PRODUCT_TRACKER:
            icon = productTrackerIcon;
            break;
            
        case NAV_ICONS.SELLER_RESEARCH:
            icon = sellerResearchIcon;
            break;
            
        case NAV_ICONS.SELLER_DATABASE:
            icon = sellerDatabaseIcon;
            break;
            
        case NAV_ICONS.SELLER_MAP:
            icon = sellerMapIcon;
            break;
            
        case NAV_ICONS.SELLER_INVENTORY:
            icon = sellerInventoryIcon;
            break;
            
        case NAV_ICONS.KEYWORD_RESEARCH:
            icon = keywordResearchIcon;
            break;
            
        case NAV_ICONS.KEYWORD_REVERSE:
            icon = keywordReverseIcon;
            break;
            
        case NAV_ICONS.KEYWORD_DATABASE:
            icon = keywordDatabaseIcon;
            break;
            
        case NAV_ICONS.KEYWORD_TRACKER:
            icon = keywordTrackerIcon;
            break;
    }

    return <img src={icon} alt="nav-icon"/>;
}

export default NavIcon;