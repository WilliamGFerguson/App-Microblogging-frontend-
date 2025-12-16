import HomeIcon from '../components/icons/HomeIcon.vue';
import FollowingIcon from '../components/icons/FollowingIcon.vue';
import UserIcon from '../components/icons/UserIcon.vue';
import UserMultiIcon from '../components/icons/UserMultiIcon.vue';
import LogoutIcon from '../components/icons/LogoutIcon.vue';

const mainNavData = [
  { label: "home", href: "", icon: HomeIcon, role: ["guest", "user", "moderator", "admin"] },
  { label: "following", href: "following", icon: FollowingIcon, role: ["user", "moderator", "admin"] },
  { label: "profile", href: "profile", icon: UserIcon, role: ["user", "moderator", "admin"] },
  { label: "users", href: "users", icon: UserMultiIcon, role: ["admin"] },
  { label: "logout", href: "logout", icon: LogoutIcon, role: ["user", "moderator", "admin"] }
]

export default mainNavData