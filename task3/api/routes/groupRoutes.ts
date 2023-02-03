import {Router} from 'express';
import { GroupController } from '../../controllers/GroupController';
import { groupSchema, groupValidator } from '../validators/groupValidator';
import { userGroupSchema, userGroupValidator } from '../validators/userGroupValidator';


const groupRouter = Router();

groupRouter.get('/', GroupController.getAllGroups);

groupRouter.get('/:id', GroupController.getGroup);

groupRouter.post('/', groupValidator(groupSchema), GroupController.createGroup);

groupRouter.post('/:id', groupValidator(groupSchema), GroupController.updateGroup);

groupRouter.delete('/:id', GroupController.deleteGroup);

groupRouter.post('/:id/addUsers', userGroupValidator(userGroupSchema), GroupController.addUsersToGroup);

export default groupRouter;
