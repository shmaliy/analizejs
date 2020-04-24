var shell = require('shelljs');

var Analizejs = function () {

};

Analizejs.prototype.memory = function () {
    var output = shell.exec('free -m', {silent: true});
    var exp = /\d+/g;

    var values = output.stdout.match(exp);

    var mem = {};

    mem.total = values[0];
    mem.used = values[1];
    mem.free = values[2];
    mem.shared = values[3];
    mem.buffers = values[4];
    mem.cached = values[5];

    return mem;
};

Analizejs.prototype.cpu = function () {

    if(!shell.which('mpstat')) {
        throw Error();
    }

    var result = shell.exec('mpstat -P ALL | tail -n +4', {silent: true});

    result = result.stdout.replace(/  +/g, ' ');
    result = result.slice(0, -1);
    result = result.split('\n');

    var cpu = { cores: []};
    var aux;

    result.forEach(function (line) {

        aux = line.split(' ');
        var core = {};

        core.usr = aux[3];
        core.nice = aux[4];
        core.sys = aux[5];
        core.iowait = aux[6];
        core.irq = aux[7];
        core.soft = aux[8];
        core.steal = aux[9];
        core.guest = aux[10];
        core.gnice = aux[11];
        core.idle = aux[12];

        if(aux[2] == 'all') {

            cpu = core;
            cpu.cores = [];

        } else {

            core.id = aux[2];
            cpu.cores.push(core);

        }

    });

    return cpu;

};

Analizejs.prototype.vms = function () {
    var output = shell.exec('virt-top -n 2 --stream | grep "instance"', {silent: true}); 

    var lines = output.stdout.trim().split("\n");

    if(output.output == '') {

        return [];

    } else {

        var result = [];

        lines.forEach(function (line) {

        var instance = getInstance(line.split(' '))

        if(instance.cpu != 0 || instance.memory != 0) {

            result.push(instance);

        }
    
    });

    return result;

    }
}

function getInstance(line) {

    var i = line.length

    var obj = {};

    var elementsGot = 0;

    while(elementsGot < 4 || i > -1) {

        if(line[i]) {

        elementsGot++;

        switch (elementsGot) {

            case 1:
                obj.name = line[i];
                break;

            case 2:
                obj.time = line[i];
                break;

            case 3:
                obj.memory = line[i];
                break;

            case 4:
                obj.cpu = line[i];
                break;

            default:
                break;

      }

    }


    i--;

  }

  return obj;

}

module.exports = Analizejs;