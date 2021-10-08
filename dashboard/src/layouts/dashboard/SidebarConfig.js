// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import SvgIconStyle from "../../components/SvgIconStyle";
// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: "100%", height: "100%" }}
  />
);

const ICONS = {
  blog: getIcon("ic_blog"),
  cart: getIcon("ic_cart"),
  chat: getIcon("ic_chat"),
  mail: getIcon("ic_mail"),
  user: getIcon("ic_user"),
  calendar: getIcon("ic_calendar"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
  kanban: getIcon("ic_kanban"),
  company: getIcon("company"),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    // subheader: 'general',
    items: [
      {
        title: "search",
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      // {
      //   title: "company",
      //   path: PATH_DASHBOARD.general.company,
      //   icon: ICONS.company,
      // },
      // {
      //   title: "contacts",
      //   path: PATH_DASHBOARD.general.contacts,
      //   icon: ICONS.user,
      // },
      {
        title: "Tasks",
        path: PATH_DASHBOARD.general.tasks,
        icon: ICONS.analytics,
      },
      {
        title: "pricing & Plan",
        path: PATH_DASHBOARD.general.contacts,
        icon: ICONS.ecommerce,
      },
      {
        title: "Templates",
        path: PATH_DASHBOARD.general.templates,
        icon: ICONS.calendar,
      },
      {
        title: "Snippets",
        path: PATH_DASHBOARD.general?.snippets,
        icon: ICONS.kanban,
      },
      {
        title: "Sequences",
        path: PATH_DASHBOARD.general?.sequences,
        icon: ICONS.company,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: "management",
  //   items: [
  //     // MANAGEMENT : USER
  //     {
  //       title: "user",
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: "profile", path: PATH_DASHBOARD.user.profile },
  //         { title: "cards", path: PATH_DASHBOARD.user.cards },
  //         { title: "list", path: PATH_DASHBOARD.user.list },
  //         { title: "create", path: PATH_DASHBOARD.user.newUser },
  //         { title: "edit", path: PATH_DASHBOARD.user.editById },
  //         { title: "account", path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // MANAGEMENT : E-COMMERCE
  //     {
  //       title: "e-commerce",
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: "shop", path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: "product", path: PATH_DASHBOARD.eCommerce.productById },
  //         { title: "list", path: PATH_DASHBOARD.eCommerce.list },
  //         { title: "create", path: PATH_DASHBOARD.eCommerce.newProduct },
  //         { title: "edit", path: PATH_DASHBOARD.eCommerce.editById },
  //         { title: "checkout", path: PATH_DASHBOARD.eCommerce.checkout },
  //         { title: "invoice", path: PATH_DASHBOARD.eCommerce.invoice },
  //       ],
  //     },

  //     // MANAGEMENT : BLOG
  //     {
  //       title: "blog",
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: "posts", path: PATH_DASHBOARD.blog.posts },
  //         { title: "post", path: PATH_DASHBOARD.blog.postById },
  //         { title: "new post", path: PATH_DASHBOARD.blog.newPost },
  //       ],
  //     },
  //   ],
  // },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: "app",
  //   items: [
  //     { title: "mail", path: PATH_DASHBOARD.mail.root, icon: ICONS.mail },
  //     { title: "chat", path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     {
  //       title: "calendar",
  //       path: PATH_DASHBOARD.calendar,
  //       icon: ICONS.calendar,
  //     },
  //     { title: "kanban", path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },
];

export default sidebarConfig;
