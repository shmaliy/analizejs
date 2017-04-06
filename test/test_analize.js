var expect = require('chai').expect;
var Analizejs = require('../lib/analize');

describe('Analizejs', function () {

	var analize = new Analizejs();

	context('when calling analize.memory', function () {

		var memory = analize.memory();

		it('should return an object with properties', function () {

			expect(memory).to.have.property('total');
			expect(memory).to.have.property('used');
			expect(memory).to.have.property('free');
			expect(memory).to.have.property('shared');
			expect(memory).to.have.property('buffers');
			expect(memory).to.have.property('cached');

		});

	});

	context('when calling analize.cpu', function () {

		var cpu = analize.cpu();

		it('should return an object with properties', function () {

			expect(cpu).to.have.property('usr');
			expect(cpu).to.have.property('nice');
			expect(cpu).to.have.property('sys');
			expect(cpu).to.have.property('iowait');
			expect(cpu).to.have.property('irq');
			expect(cpu).to.have.property('soft');
			expect(cpu).to.have.property('steal');
			expect(cpu).to.have.property('guest');
			expect(cpu).to.have.property('gnice');
			expect(cpu).to.have.property('idle');

		});

		it('should return cores usage average', function () {
			
			expect(cpu.cores).to.have.length.above(0);

			cpu.cores.forEach(function (core) {

				expect(core).to.have.property('usr');
				expect(core).to.have.property('nice');
				expect(core).to.have.property('sys');
				expect(core).to.have.property('iowait');
				expect(core).to.have.property('irq');
				expect(core).to.have.property('soft');
				expect(core).to.have.property('steal');
				expect(core).to.have.property('guest');
				expect(core).to.have.property('gnice');
				expect(core).to.have.property('idle');

			});

		});


	});


});