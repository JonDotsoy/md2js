var markdown = require('../lib/markdown')
var loremIpsum = require('lorem-ipsum')


describe('verificando encabezados', function() {
	for (var i = 1; i <= 2; i++) {
		describe('de nivel ' + i, function(level) {
			var bodyHeaderMode1,
				bodyHeaderMode2,
				bodyHeaderMode3,
				randomText

			beforeEach(function() {
				randomText = loremIpsum()
				bodyHeaderMode1 = markdown.isHeader('#'.repeat(level) + ' ' + randomText)
				bodyHeaderMode2 = markdown.isHeader('#'.repeat(level) + ' ' + randomText + ' ' + '#'.repeat(level))
				bodyHeaderMode3 = markdown.isHeader(randomText, (level == 1) ? '======' : '------')
			})

			it('si coenside el texto', function() {
				expect(bodyHeaderMode1.literal).toBe(randomText)
				expect(bodyHeaderMode2.literal).toBe(randomText)
				expect(bodyHeaderMode3.literal).toBe(randomText)
			})

			it('si es de nibel ' + level, function() {
				expect(bodyHeaderMode1.level).toBe(level)
				expect(bodyHeaderMode2.level).toBe(level)
				expect(bodyHeaderMode3.level).toBe(level)
			})
		}.bind(null, i))
	}

	for (var i = 3; i <= 6; i++) {
		describe('de nivel ' + i, function(level) {
			var bodyHeaderMode1,
				bodyHeaderMode2,
				randomText

			beforeEach(function() {
				randomText = loremIpsum()
				bodyHeaderMode1 = markdown.isHeader('#'.repeat(level) + ' ' + randomText)
				bodyHeaderMode2 = markdown.isHeader('#'.repeat(level) + ' ' + randomText + ' ' + '#'.repeat(level))
			})

			it('si coenside el texto', function() {
				expect(bodyHeaderMode1.literal).toBe(randomText)
				expect(bodyHeaderMode2.literal).toBe(randomText)
			})

			it('si es de nibel ' + level, function() {
				expect(bodyHeaderMode1.level).toBe(level)
				expect(bodyHeaderMode2.level).toBe(level)
			})
		}.bind(null, i))
	}
})

