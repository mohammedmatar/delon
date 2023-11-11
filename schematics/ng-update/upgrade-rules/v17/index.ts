import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import { autoRegisterFormWidgets } from './autoRegisterFormWidgets';
import { updatePreloader } from './preloader';
import { removeForRoot } from './removeForRoot';
import { replaceProvideConfig } from './replaceProvideConfig';
import { logFinished, logInfo } from '../../../utils';
import { UpgradeMainVersions } from '../../../utils/versions';

function finished(): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());

    logFinished(
      context,
      `Congratulations, Abort more detail please refer to upgrade guide https://github.com/ng-alain/ng-alain/issues/2390`
    );
  };
}

export function v17Rule(): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    UpgradeMainVersions(tree);
    logInfo(context, `Upgrade dependency version number`);
    return chain([removeForRoot(), autoRegisterFormWidgets(), replaceProvideConfig(), updatePreloader(), finished()]);
  };
}