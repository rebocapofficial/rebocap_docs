import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Shared structure approved in Chinese. Labels are localized by sidebars.ts.
// A landing page belongs on its category link, never as a duplicate child.
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type:'html', value:'<div class="sidebar-section-label">REBOCAP 文档</div>'},
    {type:'doc', id:'README', label:'文档介绍'},
    {type:'link', label:'目录', href:'/zh-Hans/docs/#navigation_directory'},
    {type:'html', value:'<div class="sidebar-section-label">REBOCAP 教程</div>'},
    {
      type:'category', label:'使用教程', collapsed:true,
      link:{type:'doc', id:'tutorial/README'},
      items:[
        {type:'doc', id:'rebocap-tutorials/6-set-unboxing', label:'6 追踪器套装：开箱到使用'},
        {type:'doc', id:'rebocap-tutorials/15-set-unboxing', label:'15 追踪器套装：开箱到使用'},
        {type:'doc', id:'tutorial/hardware_check', label:'硬件说明'},
        {type:'doc', id:'tutorial/instroction_for_straps', label:'绑带使用介绍'},
        {type:'doc', id:'tutorial/software_install', label:'软件下载安装'},
        {type:'doc', id:'tutorial/connect_and_use', label:'连接和使用'},
        {type:'doc', id:'rebocap-tutorials/steamvr_guide', label:'SteamVR 操作指南'},
      ],
    },
    {type:'html', value:'<div class="sidebar-section-label">帮助手册</div>'},
    {
      type:'category', label:'UI 帮助文档', collapsed:true,
      link:{type:'doc', id:'ui_help_doc/README'},
      items:[
        {
          type:'category', label:'控制区', collapsed:true,
          link:{type:'doc', id:'ui_help_doc/control/README'},
          items:[
            {type:'doc', id:'ui_help_doc/control/connect', label:'连接'},
            {type:'doc', id:'ui_help_doc/control/cap_param', label:'动捕参数'},
            {type:'doc', id:'ui_help_doc/control/skeleton_setting', label:'骨架设置'},
            {type:'doc', id:'ui_help_doc/control/config', label:'配置'},
          ],
        },
        {type:'doc', id:'ui_help_doc/info', label:'硬件信息列表'},
        {type:'doc', id:'ui_help_doc/remap', label:'硬件连接预览'},
        {type:'doc', id:'ui_help_doc/view', label:'3D 预览区'},
      ],
    },
    {type:'html', value:'<div class="sidebar-section-label">常见问题</div>'},
    {type:'doc', id:'QA/README', label:'常见问题'},
    {type:'doc', id:'QA/magnet', label:'磁场问题总结'},
    {type:'html', value:'<div class="sidebar-section-label">软件接入</div>'},
    {type:'doc', id:'third_party_software_access/README', label:'其它软件接入'},
    {
      type:'category', label:'SteamVR 协议接入', collapsed:true,
      link:{type:'doc', id:'third_party_software_access/steamvr/README'},
      items:[{type:'doc', id:'third_party_software_access/steamvr/vrchat', label:'VRChat 接入'}],
    },
    {
      type:'category', label:'VMC 协议接入', collapsed:true,
      link:{type:'doc', id:'third_party_software_access/VMC/README'},
      items:[{type:'doc', id:'third_party_software_access/VMC/warudo', label:'Warudo 接入'}],
    },
    {type:'html', value:'<div class="sidebar-section-label">其它</div>'},
    {
      type:'category', label:'插件', collapsed:true,
      link:{type:'doc', id:'plugins/plugins'},
      items:[
        {type:'doc', id:'plugins/blender', label:'Blender'},
        {type:'doc', id:'plugins/ue', label:'UE'},
        {type:'doc', id:'plugins/unity', label:'Unity'},
      ],
    },
    {type:'doc', id:'SDK/README', label:'SDK'},
    {type:'doc', id:'product_certification/README', label:'产品认证'},
  ],
};

export default sidebars;
