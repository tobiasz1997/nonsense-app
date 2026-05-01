import { CalculationResultType } from '@interfaces/calculationResultType';

export const generateString = (
	length: number,
	space: boolean
): CalculationResultType<string> => {
    let ipsum = loremIpsum;

    if (!space) {
        ipsum = loremIpsum.replace(/\s/g, "");
    }

    const repeatCount = Math.ceil(length / ipsum.length);

	return { result: ipsum.repeat(repeatCount).slice(0, length) };
};

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. ' +
    ' Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. ' +
    'Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est ' +
    'eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, ' +
    'pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. ' +
    'Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. ' +
    'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam nibh. ' +
    'Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. ' +
    'Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. ' +
    'Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. ' +
    'Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. ' +
    'Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Morbi vel erat non mauris convallis vehicula. ' +
    'Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. ' +
    'Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, ' +
    'et tristique ligula justo vitae magna. Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ' +
    'ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. ' +
    'Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. ' +
    'Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, ' +
    'felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet. Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit. Donec facilisis, magna eget elementum pellentesque, odio augue ultrices enim, vitae ' +
    'consequat enim sem nec metus. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna ' +
    'eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. ' +
    'Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. ' +
    'Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi. Pellentesque fermentum dolor. ' +
    'Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc. Sed adipiscing ornare risus. ' +
    'Morbi est est, blandit sit amet, sagittis vel, euismod vel, velit. Pellentesque egestas sem. Suspendisse commodo ' +
    'ullamcorper magna. Ut aliquam sollicitudin leo. Cras iaculis ultricies nulla. Donec quis dui at dolor tempor interdum. ' +
    'Vivamus molestie gravida turpis. Fusce lobortis lorem at ipsum semper sagittis. Nam convallis pellentesque nisl. ' +
    'Integer malesuada commodo nulla. Integer vitae libero ac risus egestas placerat. Vestibulum commodo felis quis tortor. ' +
    'Ut aliquam sollicitudin leo. Cras iaculis ultricies nulla. Donec quis dui at dolor tempor interdum.';
