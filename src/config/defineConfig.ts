import { LoggerOptions } from 'typeorm';

/**
 * 用于智能提示
 */
export function defineConfig(config: IConfig): IConfig {
    return config;
}

/**
 * 配置
 */
export interface IConfig {
    /**
     * 管理员角色ID，一旦分配，该角色下分配的管理员都为超级管理员
     */
    rootRoleId?: number;
    /**
     * 用户鉴权Token密钥
     */
    jwt?: JwtConfigOptions;
    /**
     * Mysql数据库配置
     */
    database?: DataBaseConfigOptions;
    /**
     * Swagger文档配置
     */
    swagger?: SwaggerConfigOptions;
}

//--------- config interface ------------
export interface JwtConfigOptions {
    secret: string;
}

export interface DataBaseConfigOptions {
    type?: string;
    host?: string;
    port?: number | string;
    username?: string;
    password?: string;
    database?: string;
    synchronize?: boolean;
    logging?: LoggerOptions;
}

export interface SwaggerConfigOptions {
    enable?: boolean;
    path?: string;
    title?: string;
    desc?: string;
    version?: string;
}
