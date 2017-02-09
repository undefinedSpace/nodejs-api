import inert   from 'inert';
import vision  from 'vision';
import { swaggerPlugin } from './plugins/swagger.plugin'

export const plugins = [
    inert,
    vision,
    swaggerPlugin
];