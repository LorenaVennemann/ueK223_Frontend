import authorities from '../config/Authorities';
import { Authority } from '../types/models/Authority.model';
import { Role } from '../types/models/Role.model';

// Create a new set to store unique authorities
const authoritySet = new Set<authorities>();

// Define an object 'AuthorityService' containing methods for authority management
const AuthorityService = {
  initAuthoritySet: (
    user = JSON.parse(localStorage.getItem('user') || '{}')
  ) => {
    const roles = user && user.roles ? user.roles : [];
    roles.forEach((role: Role) => {
      role.authorities.forEach((authority: Authority) => {
        authoritySet.add(authority.name);
      });
    });
  },

  // Check if the authority set contains all specified authorities
  hasAuthority: (authority: authorities) => {
    AuthorityService.initAuthoritySet();

    return authoritySet.has(authority);
  },

  hasAuthorities: (authorities: authorities[]) => {
    AuthorityService.initAuthoritySet();

    for (const element of authorities) {
      if (!authoritySet.has(element)) {
        return false;
      }
    }
    return true;
  },

  // Check if the authority set contains any of the specified authorities
  hasAnyAuthority: (authorities: authorities[]) => {
    for (const element of authorities) {
      if (authoritySet.has(element)) {
        return true;
      }
    }
    return false;
  },
  clearAuthorities: (): void => {
    authoritySet.clear();
  },
};

export default AuthorityService;
