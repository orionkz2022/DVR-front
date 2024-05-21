
export const API_URL = 'http://45.141.76.30:8172/device/get_by/all';

//Получение списка файлов устройств раннее загруженных в базу
export const FILE_API_URL = 'http://45.141.76.30:8172/media_file/filter/1/5';
export const HEADERS = {
    SmartDVRLogin: 'admin',
    SmartDVRToken: 'ac425fec-0856-11ef-8012-0001693eb0e4',
};

//Авторизация пользователя
export const LOGIN_API_URL = 'http://45.141.76.30:8172/user/login';

//Получение пользователей администраторы
export const ADMINS_API_URL = 'http://45.141.76.30:8172/user/get_by/admin';
export const ADMINS_HEADERS = {
    SmartDVRLogin: 'admin',
    SmartDVRToken: 'ac425fec-0856-11ef-8012-0001693eb0e4',
};

//Получение пользователей операторы
export const OPERATORS_API_URL = 'http://45.141.76.30:8172/user/get_by/operator';
export const OPERATORS_HEADERS = {
    SmartDVRLogin: 'admin',
    SmartDVRToken: 'ac425fec-0856-11ef-8012-0001693eb0e4',
};

//Получение пользователей
export const USERS_API_URL = 'http://45.141.76.30:8172/user/get_by/all';
export const USERS_HEADERS = {
    SmartDVRLogin: 'admin',
    SmartDVRToken: 'ac425fec-0856-11ef-8012-0001693eb0e4',
};

//GET_PREVIEW_PICTURES
export const VIDEO_PREVIEW_URL = (fileUID: string, token:any) => `http://45.141.76.30:8172/play/file/${fileUID}/preview/${token}`;

//GET_PLAY_ONLINE
export const ONLINE_PLAY_URL = (uid: string) => `http://45.141.76.30:8172/play/online/${uid}`;


//GET_GROUPS
export const GET_GROUPS_URL =  `http://45.141.76.30:8172/group/get_by/all`;







