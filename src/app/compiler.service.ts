/**
 * Created by qhyang on 2017/11/15.
 */

import { InjectionToken } from "@angular/core";
import {JitCompilerFactory} from "@angular/compiler";

const Compiler = new InjectionToken<JitCompilerFactory>('compiler.service');

function CompilerFactory () {
    return new JitCompilerFactory([{ useDebug: false, useJit: true }]).createCompiler();
}

export { Compiler, CompilerFactory };
