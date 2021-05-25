namespace SpriteKind {
    export const Treasure = SpriteKind.create()
    export const Garbage = SpriteKind.create()
    export const Animal = SpriteKind.create()
    export const Heart = SpriteKind.create()
}
function createNet (vx: number, vy: number) {
    if (mySprite.y >= submarin_border) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . b b . . . . . . 
            . . . . . . . b 9 1 b . . . . . 
            . . b b . . . b 9 9 b . . . . . 
            . b 9 1 b . . b b b . . b b b . 
            . b 3 9 b . b b b b . b 9 9 1 b 
            . b b b b b 9 9 1 1 b b 3 9 9 b 
            . . . . b 9 d 9 1 1 b b b b b . 
            . . . . b 5 3 9 9 9 b . . . . . 
            . . b b b 5 3 3 d 9 b . . . . . 
            . b 5 1 b b 5 5 9 b b b b . . . 
            . b 5 5 b b b b b b 3 9 9 3 . . 
            . b b b b b b b . b 9 1 1 9 b . 
            . . . b 5 5 1 b . b 9 1 1 9 b . 
            . . . b 5 5 5 b . b 3 9 9 3 b . 
            . . . . b b b . . . b b b b . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, vx, vy)
    } else if (mySprite.y >= ship_border) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . f . . . . . . . . 
            . . . f f . . f . f . . . . . . 
            . . . f f . f f f f f f f f f . 
            . . . f f f 1 1 1 1 1 1 1 . f . 
            . . f f . 1 . 1 . . 1 . 1 . f f 
            f f f 1 1 1 1 1 1 1 1 1 1 1 1 f 
            f 1 . 1 . 1 . 1 . . 1 . 1 . . f 
            f 1 . 1 1 1 1 1 1 1 1 . 1 . 1 f 
            f 1 1 1 . 1 . 1 . . 1 . 1 . 1 f 
            f . . 1 . 1 . 1 1 1 1 1 1 1 . f 
            f 1 1 1 1 1 1 1 . 1 . 1 . 1 f f 
            f . . 1 . . 1 1 . 1 . 1 . 1 f . 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 1 
            f . . 1 . 1 . 1 . 1 . 1 . . f . 
            f . 1 1 . 1 . 1 . 1 . 1 . . f . 
            f f f f f f f f f f f f f f f 1 
            `, mySprite, vx, vy)
    } else {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . c d c . . . . . . 
            . . . . . . . c 5 c . . . . . . 
            . . . . . . c d 5 d c . . . . . 
            . . . b c c d 5 5 5 d c c b . . 
            . . b d d 5 5 5 5 5 5 5 d d b . 
            . . . b c c d 5 5 5 d c c b . . 
            . . . . . . c d 5 d c . . . . . 
            . . . . . . . c 5 c . . . . . . 
            . . . . . . . c d c . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, vx, vy)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.up.isPressed()) {
        rescueAnimal(0, -100)
    } else if (controller.down.isPressed()) {
        rescueAnimal(0, 100)
    } else if (controller.left.isPressed()) {
        rescueAnimal(-100, 0)
    } else if (controller.right.isPressed()) {
        rescueAnimal(100, 0)
    } else {
        rescueAnimal(100, 100)
    }
})
sprites.onOverlap(SpriteKind.Animal, SpriteKind.Heart, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 200)
    rescuecount += 1
    if (rescuecount == 10) {
        info.changeLifeBy(1)
        rescuecount = 0
    }
})
function resetcountdown () {
    info.startCountdown(120)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.up.isPressed()) {
        createNet(0, -100)
    } else if (controller.down.isPressed()) {
        createNet(0, 100)
    } else if (controller.left.isPressed()) {
        createNet(-100, 0)
    } else if (controller.right.isPressed()) {
        createNet(100, 0)
    } else {
        createNet(100, 100)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Treasure, function (sprite, otherSprite) {
    resetcountdown()
    otherSprite.destroy(effects.confetti, 1000)
    music.magicWand.play()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mydirection = 0
})
sprites.onCreated(SpriteKind.Garbage, function (sprite) {
    if (Math.percentChance(10)) {
        sprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 6 . . . . . . . . 
            . . . . . . a a . . . . . . . . 
            . . . . . . a a . . . . . . . . 
            . . . . . . a a . . . . . . . . 
            . . . . a a a a a a . . . . . . 
            . . . . a a 6 6 6 a . . . . . . 
            . . . . a a 6 6 6 a . . . . . . 
            . . . . a c c c c a . . . . . . 
            . . . . a c b b b c . . . . . . 
            . . . . a c c c c c . . . . . . 
            . . . . a c c c b b . . . . . . 
            . . . . a c c c c c . . . . . . 
            . . . . a c b b b c . . . . . . 
            . . . . a c c c c c . . . . . . 
            . . . . a a a a a a . . . . . . 
            `)
    } else if (Math.percentChance(10)) {
        sprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
            . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
            . . f f f f 1 f f f f f 1 f . . 
            . . f 1 1 f f f 1 1 f f f f . . 
            . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else if (Math.percentChance(10)) {
        sprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . 1 1 f f f f 1 1 1 . . . . 
            . . . 1 1 f 1 1 1 1 1 1 . . . . 
            . . . 1 1 f 1 f f f 1 1 . . . . 
            . . . 1 1 f f f f 1 1 1 . . . . 
            . . . 2 2 2 2 2 f 2 2 2 . . . . 
            . . . 2 2 2 2 2 f 2 2 2 . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else if (Math.percentChance(10)) {
        sprite.setImage(img`
            . . . . . . . . . . 5 . . . . . 
            . . . . . . . . . . 5 . . . . . 
            . . . . . . . 5 5 5 5 . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . 4 4 4 4 4 4 4 4 . . . . 
            . . . . 4 4 4 4 5 4 5 4 . . . . 
            . . . . 4 4 5 4 5 4 5 4 . . . . 
            . . . . 4 5 4 4 5 5 5 4 . . . . 
            . . . . 4 5 4 4 4 4 4 4 . . . . 
            . . . . 4 5 4 4 5 5 5 5 . . . . 
            . . . . 4 4 5 4 5 4 4 5 . . . . 
            . . . . 4 4 4 4 5 5 5 5 . . . . 
            . . . . 4 4 4 4 5 4 4 4 . . . . 
            . . . . 4 4 4 4 5 4 4 4 . . . . 
            `)
    } else if (Math.percentChance(10)) {
        sprite.setImage(img`
            . . . . . . . . . . a . . . . . 
            . . . . . . . . . . a . . . . . 
            . . . . . . . a a a a . . . . . 
            . . . . . . . a . . . . . . . . 
            . . . . . . . a . . . . . . . . 
            . . . . . . . a . . . . . . . . 
            . . . . 6 6 6 6 6 6 6 6 . . . . 
            . . . . 6 6 6 6 5 6 5 6 . . . . 
            . . . . 6 6 5 6 5 6 5 6 . . . . 
            . . . . 6 5 6 6 5 5 5 6 . . . . 
            . . . . 6 5 6 6 6 6 6 6 . . . . 
            . . . . 6 5 6 6 5 5 5 5 . . . . 
            . . . . 6 6 5 6 5 6 6 5 . . . . 
            . . . . 6 6 6 6 5 5 5 5 . . . . 
            . . . . 6 6 6 6 5 6 6 6 . . . . 
            . . . . 6 6 6 6 5 6 6 6 . . . . 
            `)
    } else if (Math.percentChance(10)) {
        sprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . 3 3 3 3 3 3 3 3 3 3 . . . 
            . . . 3 3 3 3 3 3 3 3 3 3 . . . 
            . . . 3 3 3 3 3 3 3 3 3 3 . . . 
            . . . 3 3 3 3 3 3 3 3 3 3 . . . 
            . . . 1 1 1 2 2 2 2 2 2 2 . . . 
            . . . 1 2 2 2 1 1 1 2 2 2 . . . 
            . . . 1 1 1 2 1 2 1 2 2 2 . . . 
            . . . 2 2 1 2 1 1 1 2 2 2 . . . 
            . . . 1 1 1 2 2 2 2 2 2 2 . . . 
            . . . 3 3 3 3 3 3 3 3 3 3 . . . 
            . . . 3 1 1 3 3 3 3 1 3 3 . . . 
            . . . 3 1 3 1 3 3 1 3 1 3 . . . 
            . . . 3 1 3 1 3 1 1 1 1 1 . . . 
            . . . 3 1 1 3 3 1 1 3 1 1 . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else if (Math.percentChance(10)) {
        sprite.setImage(img`
            . f f f f f f f f f f f f f . . 
            . f 1 1 1 1 1 1 1 1 1 1 1 f . . 
            . f f 1 f f f f f 1 1 f 1 f f . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . f 1 f f 1 f 1 f 1 f f f f . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . f 1 f 1 f 1 1 f f f f 1 f . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f f 1 1 f 1 f f f 1 f 1 1 f . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f 1 f f f 1 f 1 1 f f 1 f . . 
            . f 1 1 1 1 1 1 1 1 1 1 1 f . . 
            . f f f f f 1 f 1 1 f f f f . . 
            . f 1 1 1 1 1 1 1 1 1 1 1 f . . 
            . f 1 1 1 1 1 1 1 f f 1 1 f . . 
            . f f f f f f f f f f f f f . . 
            `)
    } else if (Math.percentChance(10)) {
        sprite.setImage(img`
            ..............cccccccccccccccc..
            ..............fdddddddddddddddb.
            c......fff..fffddddddddddddddddc
            cf....ff3fffdddd3333dddd3d333bbc
            cffffffddddddddddddffddddddddddc
            cddddddddddddddddffddddddddddddc
            cddddddddffffddddffffffffffddddc
            cbb33ddff3fbf3d33dd33ddd3ff33bbc
            cddddddfffddfdddddddddddfddddddc
            cdddddfdfddd3fffffffffffdddddddc
            cddddfddfddd333333dffddddddddddc
            cb333fddd3db3ddd33dffffffffdd3bc
            cdddfddddddddddd3dddddddddfddddc
            cdddfdddddddddddddddddffffdddddc
            cdddffffffffffffffffffdddddddddc
            cbbbbbb3333333dddd333d3dddd33bbc
            cddddddddddddddddddddddddddddddc
            cbddddddddddddddddddddddddddddbc
            cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
            cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
            .cccccccccccccccccccccccccccccc.
            ..cbbc....................cbbc..
            ..c33c....................c33c..
            ...cc......................cc...
            `)
    } else if (Math.percentChance(10)) {
        sprite.setImage(img`
            ...............bbbbbbbbbbbbbbbbbbb...............
            ...........bbbbdd111111111111111ddbbbb...........
            ..........bd1111111111111111111111111dbbb........
            ......bb...b11111dddddddddddddd111111111dbb......
            ....bbdbb..bbbbbd11111111111111dddd1111111dbb....
            ...bd111bbb....b1111111111111111111ddd111111db...
            ..bd11111dbbb..bdddddddddddddddddd111ddd11111db..
            .bd11111dd11b..bd111111111111111dddd111dd11111db.
            .b11111d111db..b1111111111111111111ddd111d11111b.
            bd11111d1dddbb.b111111111111111111111ddd1111111db
            b11111d1ddd1bbbb11111fff11fffffff11111ddd1d11111b
            b11111ddddd1111111fff11f1fff1fffff1111ddddd11111b
            b11111ddddd111111f11111ff1fffffffff111dddbd11111b
            b111111dddd111111111111ffffffffffff111dddb111111b
            bd111111dddd1111111111111fff111111111dddbd11111db
            .b1111111dddd11111111111111111111111dddbd11ff11b.
            .bd1111111dbbdd11bbbb1111111111111dddbbd11fff1db.
            ..bd11111111dbbdd...b11111111111dddbbd11fff11db..
            ...bd111111111dbb...bdddddddddddddd11111f1f1db...
            ....bbd111111111b...bbbbbbbbddd11111111111dbb....
            ......bbdd1111bb...bb111111111111111111ddbb......
            ........bbbdd1b...bb1111111111111111ddbbb........
            ...........bbb....b11111111111dddbbbbb...........
            ................bbbbbbbbbbbbbbbbb................
            `)
    } else {
        sprite.setImage(img`
            .....................
            .....................
            ...ffff.ffffffffff.ff
            ffff111..11111111ffff
            f.ff1666.66666661ff.f
            f..f1999..9999991f..f
            f..f16666.6666661f..f
            f..f19999.9999991f..f
            f..f1666666666661f..f
            f..f1999999999991f..f
            ffff1666666666661ff.f
            ff.f1999999999991ffff
            ...f1111111111111f...
            ...fffffffffffffff...
            .....................
            .....................
            `)
    }
    tiles.placeOnTile(sprite, tiles.getTileLocation(randint(1, 99), randint(0, 14)))
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        tiles.placeOnTile(sprite, tiles.getTileLocation(randint(20, 80), randint(5, 10)))
    }
})
sprites.onCreated(SpriteKind.Animal, function (sprite) {
    tempy = randint(0, 14)
    if (tempy < 4) {
        if (Math.percentChance(20)) {
            sprite.setImage(img`
                ........................
                ........................
                .........666666.........
                ........66f16f16........
                .......666ff6ff66.......
                .......6666666666.......
                .......6666666666.......
                .......6644444666.......
                .......6664444666.......
                ........66644466........
                .........666666.........
                ..........6666..........
                ..........6666..........
                ........6666666666......
                ........66666666666666..
                ........66666666666.....
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                .............addaa......
                .............adddda.....
                ............addddda.....
                ......aaaaa.adddadda....
                ......dddddaadddadda.aa.
                444444dffddaaddaaddaadd.
                .44444d1fddaadddddaaadd.
                .44444ddddddddddddddddd.
                ..4444444ddddddddddddaa.
                ...444444dddddddddddddd.
                ....44444ddddddddddddaa.
                .....4444addddddddddddd.
                ......44aaaddddddddaddd.
                .......4a.aaddddddaaddd.
                .........aadaadddda.aaa.
                ........adddaddaaa......
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                ................................
                .........4..............444.....
                ......44414.444444....441114....
                ....44111114411114...411111144..
                .4441111111441f1f14441111111114.
                41111111111141111141111111111114
                41511111111111141111111555551111
                45151111111111111711155511111114
                .4444444411111222111111111111144
                ........44111111111111111444444.
                .........44411111111111144......
                ...........44111114441344.......
                ............4111444.444.........
                .............444................
                ................................
                ................................
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 3 3 
                3 3 . . f f 4 4 f f . . 3 3 3 3 
                3 3 3 . f 1 4 4 f 1 . 3 3 b b 3 
                3 b b b . . 4 4 . . . 3 b 2 2 3 
                3 2 2 b 3 . 4 4 . . 3 3 b 2 2 3 
                3 2 2 b 3 3 4 4 3 3 3 b b b b 3 
                b b b b b 3 4 4 3 2 2 b b b 3 3 
                3 a 2 2 a a 4 4 3 2 2 b b b 3 3 
                3 3 2 2 a 3 4 4 3 a a a b b 3 3 
                3 2 2 3 3 3 4 4 . 3 3 a 2 2 3 3 
                3 2 2 3 . . 4 4 . . 3 a 2 2 3 3 
                3 3 3 . . . 4 4 . . . 3 a a a 3 
                3 3 . . . . 4 4 . . . 3 3 a a 3 
                3 . . . . . . . . . . . 3 3 3 3 
                . . . . . . . . . . . . . 3 3 . 
                `)
        } else {
            sprite.setImage(img`
                . . . . 1 1 1 . . . 1 1 . . . . 
                . . . . 1 1 1 1 . 1 1 1 1 . . . 
                . . . . 1 1 1 1 . 1 1 1 1 . . . 
                . . . . 1 1 1 1 . 1 1 1 1 . . . 
                . . 5 5 5 5 5 5 5 5 5 1 1 . . . 
                . 5 5 5 5 f 5 f 5 f 5 f 5 5 . . 
                5 5 f f 5 f 5 f 5 f 5 f 5 5 . . 
                5 5 f 1 5 f 5 f 5 f 5 f 5 5 . . 
                5 5 5 5 5 f 5 f 5 f 5 f 5 f 5 f 
                5 5 5 5 5 f 5 f 5 f 5 f 5 f 5 . 
                . 5 5 5 5 f 5 f 5 f 5 f 5 5 5 . 
                . . 5 5 5 f 5 f 5 5 5 5 5 5 . . 
                . . . 5 5 5 5 5 5 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
        sprite.setVelocity(randint(-100, 100), 0)
    } else if (tempy < 8) {
        if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 2 2 . 2 2 . . . . . 
                . . . . . . . 2 . 2 . . . . . . 
                . . . . . . f f f f f . . . . . 
                . . . . f f f 8 8 8 f f f . . . 
                . . . f f 8 8 8 8 8 8 8 f . . . 
                . . . f 8 1 f 8 8 8 1 f f f . . 
                . . . f 8 f f 8 8 8 f f 8 f . . 
                . f f f 8 8 8 2 2 2 8 8 8 f f f 
                . f 8 8 8 1 1 2 2 2 1 8 8 8 8 f 
                . f 8 8 8 1 1 1 1 1 1 8 8 8 8 f 
                . f 8 8 8 1 1 1 1 1 1 8 8 8 8 f 
                . f 8 8 8 1 1 1 1 1 1 8 8 8 8 f 
                . f 8 f 8 1 1 1 1 1 1 8 8 f 8 f 
                . f f f 8 1 1 1 1 1 1 8 8 f f f 
                . . . f 8 1 1 1 1 1 1 8 8 f f . 
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . . c e e . . . . . . . . . 
                . . . e e e e e . . . . . . . . 
                . . e f f e e e e . . . . . . . 
                . . e f 1 e e e e . . . . . . . 
                . . e e e e e e e . . . . . . . 
                . . 2 2 e e e e e . . . . . . . 
                . . e e e e e e e . . . e e . . 
                . . e e e e c e e . . . . e e . 
                . . e e e e c e e . . . e e e c 
                . . e c c c c e e . . . e e e e 
                . . e c c c c e e . . e e e e . 
                . . e e c c c e e e e e e e . . 
                . . e e e c c e e e e e e e . . 
                . . e e e c c e e e e e e . . . 
                . . e e e e e e e e e e . . . . 
                . . . e e e e e e e c . . . . . 
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . b 1 b . . . . . . . . . . 
                . . . . b 1 b . . . . . . . . . 
                . . . . . c b . . . . . . . . . 
                . . . . b b b b b b . . . . . . 
                . . . b 1 1 1 1 1 b b . . . . . 
                . . f d 1 1 f 1 d 1 b b . . . . 
                . . c 4 d 1 f f 1 1 1 b . . . . 
                . . 4 4 d d b f d 1 1 b . . . . 
                b 4 4 4 4 4 1 1 1 d b b d d d b 
                . b 4 4 4 4 4 1 1 b 1 1 1 d b b 
                . . b 1 1 1 1 1 d 1 1 1 1 c d b 
                . b 1 1 1 1 1 1 b 1 1 d c d d c 
                . b 1 1 1 1 1 1 1 b c c d d b c 
                . b d 1 1 1 1 1 d d d d d d c . 
                . . b b 1 1 1 d d d d d b c . . 
                . . . b b c c c c c c c c . . . 
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . . . . . . . . . c c . . . 
                . . . . . . . c c c c 6 3 c . . 
                . . . . . . c 6 3 3 3 3 6 c . . 
                . . c c . c 6 c c 3 3 3 3 3 c . 
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c 
                . f f 5 c 6 c 5 f f 3 3 3 3 3 c 
                . f f 5 c 6 c 5 f f 6 3 3 3 c c 
                . b 5 5 3 c 3 5 5 c 6 6 6 6 c c 
                . . b 5 5 3 5 5 c 3 3 3 3 3 3 c 
                . c c 5 5 5 5 4 c c 3 3 3 3 3 c 
                c 5 5 4 5 5 4 c 5 5 c 3 3 3 c . 
                b 5 4 b 4 4 4 c 5 5 5 b c c . . 
                c 4 5 5 b 4 4 c 5 5 5 c b b . . 
                c 5 5 5 c 4 c 5 5 5 5 c c 5 b . 
                c 5 5 5 5 c 4 c c c c c c 5 c . 
                . c c c c c c . . . . . c c c . 
                `)
        } else {
            sprite.setImage(img`
                . . . b 5 b . . . . . . . . . . 
                . . . . b 5 b . . . . . . . . . 
                . . . . . c b . . . . . . . . . 
                . . . . b b b b b b . . . . . . 
                . . . b 5 5 5 5 5 b b . . . . . 
                . . f d 5 5 f 1 d 5 b b . . . . 
                . . c 4 d 5 f f 1 5 5 b . . . . 
                . . 4 4 d d b f d 5 5 b . . . . 
                b 4 4 4 4 4 5 5 5 d b b d d d b 
                . b 4 4 4 4 4 5 5 b 5 5 5 d b b 
                . . b 5 5 5 5 5 d 5 5 5 5 c d b 
                . b 5 5 5 5 5 5 b 5 5 d c d d c 
                . b 5 5 5 5 5 5 5 b c c d d b c 
                . b d 5 5 5 5 5 d d d d d d c . 
                . . b b 5 5 5 d d d d d b c . . 
                . . . b b c c c c c c c c . . . 
                `)
        }
        sprite.setVelocity(randint(-100, 100), 0)
    } else if (tempy < 12) {
        if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . . . . . . c c c c . . . . 
                . . . . . . c c d d d d c . . . 
                . . . . . c c c c c c d c . . . 
                . . . . c c 4 4 4 4 d c c . c c 
                . . . c 4 d 4 4 4 4 4 1 c c 4 c 
                . . c 4 4 4 1 4 4 4 4 d 1 c 4 f 
                . c 4 4 4 4 1 4 4 4 4 4 1 4 4 f 
                f 4 4 f 1 4 1 1 c f 4 4 1 f 4 f 
                f 4 4 f f 4 1 c 4 f 4 4 1 f 4 f 
                f 4 4 4 4 4 1 4 4 f 4 4 d f f f 
                . f 4 4 4 4 1 c c 4 4 d f f . . 
                . . f f 4 d 4 4 4 4 4 c f . . . 
                . . . . f f 4 4 4 4 c d b c . . 
                . . . . . . f f f f d d d c . . 
                . . . . . . . . . . c c c . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . . . . . . . c c c c c . . 
                . . . . . . c c c 5 5 5 5 c c . 
                . . . . c c 5 5 5 5 5 5 5 5 c . 
                . . . . c b b b b b b 5 5 5 c . 
                . . . c 1 1 1 b b 1 b b c c . . 
                . . . c 1 1 1 1 b 1 1 1 c . c c 
                . . . c d 1 1 1 b 1 1 1 c b 5 c 
                . . c c d 1 c 1 b 1 1 1 b b 5 c 
                c c c d d 1 1 1 b 1 b 1 5 5 5 c 
                f d d d 1 1 1 1 1 1 b 1 b b c c 
                . f f 1 1 1 1 1 1 b b 1 f . . . 
                . . . f 1 1 1 1 1 b b b f . . . 
                . . . . f f 1 1 b b 5 5 f . . . 
                . . . . . . f 5 5 5 5 5 f . . . 
                . . . . . . . f f f f f f . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                .............ccfff..............
                ............cddbbf..............
                ...........cddbbf...............
                ..........fccbbcf............ccc
                ....ffffffccccccff.........ccbbc
                ..ffbbbbbbbbbbbbbcfff.....cdbbc.
                ffbbbbbbbbbcbcbbbbcccff..cddbbf.
                fbcbbbbbffbbcbcbbbcccccfffdbbf..
                fbbb1111ff1bcbcbbbcccccccbbbcf..
                .fb11111111bbbbbbcccccccccbccf..
                ..fccc33cc11bbbbccccccccfffbbcf.
                ...fc131c111bbbcccccbdbc...fbbf.
                ....f33c111cbbbfdddddcc.....fbbf
                .....ff1111fbdbbfddcc........fff
                .......cccccfbdbbfc.............
                .............fffff..............
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                ....................ccfff...........
                ..........fffffffffcbbbbf...........
                .........fbbbbbbbbbfffbf............
                .........fbb111bffbbbbff............
                .........fb11111ffbbbbbcff..........
                .........f1cccc11bbcbcbcccf.........
                ..........fc1c1c1bbbcbcbcccf...ccccc
                ............c3331bbbcbcbccccfccddbbc
                ...........c333c1bbbbbbbcccccbddbcc.
                ...........c331c11bbbbbcccccccbbcc..
                ..........cc13c111bbbbccccccffbccf..
                ..........c111111cbbbcccccbbc.fccf..
                ...........cc1111cbbbfdddddc..fbbcf.
                .............cccffbdbbfdddc....fbbf.
                ..................fbdbbfcc......fbbf
                ...................fffff.........fff
                `)
        } else {
            sprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . 1 . 1 . . . . . . . . . 
                . . . . . 1 . . . . . . . . . . 
                . . 8 8 8 8 8 8 . . . . . . . . 
                . 8 a a a a a 8 8 . . . . . . . 
                . 8 a f f a a a 8 8 . . . . . 8 
                . 8 a f 1 a a a a 8 8 . . . 8 a 
                . 8 a a a a a a a a 8 . . 8 a a 
                . 8 2 2 2 2 a a a a 8 8 8 8 a 8 
                . 8 2 2 2 2 a a a a a a a a a 8 
                . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
        sprite.setVelocity(randint(-100, 100), 0)
    } else {
        if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . c c c c c c c c . . . . 
                . . c c b b 3 b 3 3 b b c c . . 
                . c 3 3 b 3 3 b 3 3 3 b 3 3 c . 
                c d d b 3 3 b 3 3 b 3 3 b d d c 
                f c c c d d c d d c d d c c c f 
                f b 3 c c c b c c b c c c 3 b f 
                . c b b 3 3 b 3 3 b 3 3 b b c . 
                . . f f f f f f f f f f f f . . 
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . . . f c c c c f . . . . . 
                . . c c f b b 3 3 b b f c c . . 
                . c b 3 3 b b c c b b 3 3 b c . 
                . f 3 c c c b c c b c c c 3 f . 
                f c b b c c b c c b c c b b c f 
                c 3 c c b c c c c c c b c c 3 c 
                c 3 c c c c c c c c c c c c 3 c 
                . f b b c c c c c c c c b b f . 
                . . f b b c 8 9 9 8 c b b f . . 
                . . c c c f 9 3 1 9 f c c c . . 
                . c 3 f f f 9 3 3 9 f f f 3 c . 
                c 3 f f f f 8 9 9 8 f f f f 3 c 
                f 3 c c f f f f f f f f c c 3 f 
                f b 3 c b b f b b f b b c 3 b f 
                . c b b 3 3 b 3 3 b 3 3 b b c . 
                . . f f f f f f f f f f f f . . 
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                . . . . . f c c c c f . . . . . 
                . . c c f b b 3 3 b b f c c . . 
                . c b 3 3 b b c c b b 3 3 b c . 
                . f 3 c c c b c c b c c c 3 f . 
                f c b b c c b c c b c c b b c f 
                c 3 c c b c c c c c c b c c 3 c 
                c 3 c c c c c c c c c c c c 3 c 
                . f b b c c c c c c c c b b f . 
                . . f b b c c c c c c b b f . . 
                . . c c c f f f f f f c c c . . 
                . c 3 f f f f f f f f f f 3 c . 
                c 3 f f f f f f f f f f f f 3 c 
                f 3 c c f f f f f f f f c c 3 f 
                f b 3 c b b f b b f b b c 3 b f 
                . c b b 3 3 b 3 3 b 3 3 b b c . 
                . . f f f f f f f f f f f f . . 
                `)
        } else if (Math.percentChance(20)) {
            sprite.setImage(img`
                ....88..........
                ....868.........
                .....868........
                ......868.......
                .......868......
                .......868......
                ........868.....
                ........868.....
                ........8668....
                ........8668....
                ........8668....
                ........8768....
                ........8768....
                .......86768....
                .......87768....
                .......6778.....
                ......67676.....
                ......67676.....
                .....65656......
                ....655656......
                ....65656.......
                ...876756.......
                ..876776...8....
                ..67678....8....
                .876668...88....
                .67868....86....
                .86868...876....
                868668..8768....
                86868..87678....
                86868..8766.....
                86868.87678.....
                86878.8766......
                8787887678......
                876768768.88....
                876778668.678...
                876676668..678..
                .676778668..678.
                .8766778668.6778
                .877667688885678
                ..87667768885656
                ..86766778887856
                ...8776677876876
                ....877667768668
                .....87766768668
                ......877677668.
                .......87667668.
                ........876768..
                ........87688...
                `)
        } else {
            sprite.setImage(img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                .........888....
                .......88668....
                ......86688.....
                .....8768.......
                ....8778........
                ....8778........
                ...8778.........
                ...8578.........
                ...8558.........
                ...8758......88.
                ...87678....878.
                ...87678...878..
                ....87678.8768..
                ....876768678...
                .....87668778...
                ......8668766...
                .......8687678..
                ........8667678.
                ........8685756.
                ....88..86665756
                ...868..86685656
                ..8668..86687678
                .8668..868687678
                .868..8688667678
                8768.88886876778
                8768.8888877678.
                876688888676778.
                87676888668778..
                .876776868668...
                .87766778868....
                ..877667688.....
                ...86767788.....
                `)
        }
    }
    tiles.placeOnTile(sprite, tiles.getTileLocation(randint(1, 99), tempy))
    sprite.setFlag(SpriteFlag.DestroyOnWall, true)
    if (sprite.vx > 0) {
        sprite.image.flipX()
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mydirection = 1
})
function rescueAnimal (vx: number, vy: number) {
    if (mySprite.y >= submarin_border) {
        heartProjectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . b 5 5 5 b . . . . . 
            . . . . . b b 5 5 5 b b . . . . 
            . . b b b b 5 5 5 1 1 b b b b . 
            . . b 5 5 5 5 5 5 1 1 5 5 5 b . 
            . . b d d 5 5 5 5 5 5 5 d d b . 
            . . . b d d 5 5 5 5 5 d d b . . 
            . . . c b 5 5 5 5 5 5 5 b c . . 
            . . . c b 5 5 5 5 5 5 5 b c . . 
            . . . c 5 5 d d b d d 5 5 c . . 
            . . . c 5 d d c c c d d 5 c . . 
            . . . c c c c . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, vx, vy)
    } else if (mySprite.y >= ship_border) {
        heartProjectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f . f f f f f . . 
            . . f f 3 3 3 f f f 3 3 3 f f . 
            . . f 3 3 3 3 3 f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
            . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f f 3 3 3 b b b 3 3 3 f f . 
            . . . f f 3 b b b b b 3 f f . . 
            . . . . f f b b b b b f f . . . 
            . . . . . f f b b b f f . . . . 
            . . . . . . f f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, vx, vy)
    } else {
        heartProjectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . b b b b c . . c b b b c . . 
            . b d 1 1 1 3 c c 3 d 1 1 3 c . 
            b d 1 1 1 1 d d 1 3 1 1 1 1 3 c 
            b 1 1 1 1 1 d 1 1 d d 1 1 1 1 b 
            c 3 1 1 d c c 1 1 c c 1 1 1 1 b 
            c 3 3 d 3 . . c c . . d 1 1 d b 
            b 1 1 1 3 . . . . . . 3 d d 3 c 
            b 1 1 1 d b . . . . c d d 3 3 c 
            c 3 1 1 1 1 c . . b 1 1 1 d b c 
            . c d d 1 1 1 c b 3 1 1 1 1 c . 
            . . c 1 1 1 d d 3 3 1 1 1 b . . 
            . . . b 1 3 d 1 1 d d 3 b . . . 
            . . . . b 3 1 1 1 1 d c . . . . 
            . . . . . c b 1 1 b c . . . . . 
            . . . . . . c b b c . . . . . . 
            `, mySprite, vx, vy)
    }
    heartProjectile.setKind(SpriteKind.Heart)
}
sprites.onCreated(SpriteKind.Treasure, function (sprite) {
    sprite.setImage(img`
        . . . . . 2 2 2 2 2 2 2 . . . . 
        . . . 2 2 5 5 f 5 5 5 5 2 2 . . 
        . . 2 5 5 5 f f f 5 5 5 5 5 2 . 
        . . 2 5 5 5 5 f 5 5 5 5 5 5 2 . 
        . 2 5 5 5 5 5 f 5 5 5 5 5 5 5 2 
        . 2 5 5 5 5 5 f 5 5 5 5 5 5 5 2 
        . 2 5 5 5 5 5 f 5 5 5 5 f 5 5 2 
        . 2 5 5 5 5 5 f f f f f f f 5 2 
        . 2 5 5 5 5 5 5 5 5 5 5 f 5 5 2 
        . 2 5 5 5 5 f f f f f 5 5 5 5 2 
        . 2 5 5 5 5 5 5 f 5 5 5 5 5 5 2 
        . . 2 5 5 5 5 5 f 5 5 5 5 5 2 . 
        . . 2 5 5 5 5 5 f 5 5 5 5 5 2 . 
        . . . 2 2 5 5 5 5 5 5 5 2 2 . . 
        . . . . . 2 2 2 2 2 2 2 . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    tiles.placeOnTile(sprite, tiles.getTileLocation(randint(20, 70), randint(4, 11)))
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Animal, function (sprite, otherSprite) {
    sprite.destroy(effects.bubbles, 500)
    info.changeLifeBy(-1)
    if (Math.percentChance(20)) {
        animal_words = "hey"
    } else if (Math.percentChance(20)) {
        animal_words = "ouch"
    } else if (Math.percentChance(20)) {
        animal_words = "woah"
    } else if (Math.percentChance(20)) {
        animal_words = "better_luck_next_time"
    } else {
        animal_words = "Boing"
    }
    otherSprite.say(animal_words, 2000)
    otherSprite.vx = mySprite.vx
    sprite.image.flipX()
    music.bigCrash.play()
})
function setShipGraphics () {
    if (mySprite.y >= submarin_border) {
        temp_mode = 1
        if (current_shipMode != temp_mode) {
            mySprite.setImage(img`
                ................................ffffff99........
                ................................ffffff99........
                ................................ffffff99........
                ................................fff.............
                ................................fff.............
                ..............................fffffff...........
                ..............................f55555f...........
                ..............................f55555f...........
                ..............................f55555f...........
                ..............................f55555f...........
                ...........................ffff55555ffff........
                ........................fff555555555555ffff.....
                ....................fffff55555555555555555ff....
                ................fffff5555555555555555555555f....
                .............ffff55555555555555555555555555ff...
                ............ff555555555555555555555559999999ff..
                ..........ff555555599555555599555555999999999ff.
                ........ff555555559999555559999555559999999995f.
                9.222.ffffffffffff9999555559999555559999999995ff
                ..222ff55f8181111f59955555559955555599999999955f
                99222f555f1812222f55555555555555555599999999955f
                9.222f555f8181111f55555555555555555599999999955f
                ..242f555f2222222f55555555555555555599999999955f
                ..222f555f1111111f55555555555555555559999999555f
                .9222f555f2222222f55555555555555555555555555555f
                9.222fffffffffffffffff555555555555555555555555ff
                ..222................fffff5555555555555555555ff.
                9........................ffff55555555555555fff..
                ..9..........................ffff5555555ffff....
                ................................fffffffffff.....
                ................................................
                ................................................
                `)
        }
    } else if (mySprite.y >= ship_border) {
        temp_mode = 2
        if (current_shipMode != temp_mode) {
            mySprite.setImage(img`
                ................................................
                ................................................
                ................................................
                ....fffffffff.....................fffffffff.....
                ....f1111818f....................ff1111111f.....
                ....f2222181f..................ff111111111f.....
                ....f1111818f.................f1111111111ff.....
                ....f2222222f.................ff1fffffffff......
                ....fffffffff.................ffff..............
                ............f................f222f..............
                ............f.........f....f.f111f..............
                ............f........ff...ff.f222f..............
                ............f.......f1f..f1f.f111f..............
                ............f...ffffffffffffffffffff............
                .........ffffffff555555555555555555fff..........
                .........f555555559999555999955555555ff.........
                ........ff5999995599995559999555555555ff........
                ........ff59999955999955599995555555555ff.......
                ........ffff5fff555555555555555599555555f.......
                ........fffffffffffffffffff5555599559955ff......
                .......ff88888888888888888ff5555555599555ffff...
                .......f8888888888888888888ff555555555555ff8f...
                .......f8888888888888888888888fffffff555ff88f...
                .......f88888888888888888888888888888fff8888f...
                .......f888888888888888888888888888888888888f...
                .......ffffffff8888888888888888888888888888ff...
                .........fffffffffffffffffffffffffffffffffff....
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                `)
        }
    } else {
        temp_mode = 3
        if (current_shipMode != temp_mode) {
            mySprite.setImage(img`
                ................................................
                ...................................9.....9......
                ....999...999........................9..........
                ..........................................9.....
                ....ffffffffff.................fffffffffffffff..
                .....9...f..........................9..f....9...
                ......9..f.99......................9...f.9......
                .........f.............................f........
                .......7777777777777777777777777777777777.......
                ......777818111177777777777777777777777777......
                .....77771812222777777777777777777777777777.....
                .77777777818111177777777777777777777777777777...
                7777777772222222777777777777777777777777999977..
                79997777777777777fff7fff7fff7777444447779999777.
                79997777779999977f7f7f777f777777444447779999777.
                79997777779999977ff77fff7fff7777444447779999777.
                79997777779999977f7f7f77777f77774f4447779999777.
                777777777799999777777fff7fff7777444447779999777.
                .7777777779999977fff77777777777744444777999977..
                ...77777777777777f777f7f77ff77774444477777777...
                ....7777777777777fff7fff7fff77774444477777777...
                .......7777777777777777777777777777777777.......
                .........f...........................f..........
                .........f...........................f..........
                .........f...........................f..........
                ........f.f.........................f.f.........
                ....ffff...ffff.................ffff...ffff.....
                ................................................
                ................................................
                ................................................
                ................................................
                ................................................
                `)
        }
    }
    if (mydirection == 0) {
        mySprite.image.flipX()
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Garbage, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 500)
    otherSprite.destroy(effects.fire, 500)
    music.jumpUp.play()
    info.changeScoreBy(1)
})
let temp_mode = 0
let animal_words = ""
let heartProjectile: Sprite = null
let tempy = 0
let projectile: Sprite = null
let rescuecount = 0
let mydirection = 0
let myGarbage: Sprite = null
let myAnimal: Sprite = null
let MyTreasure: Sprite = null
let submarin_border = 0
let ship_border = 0
let current_shipMode = 0
let mySprite: Sprite = null
game.splash("Let's Clean Up the ocean!", "and Save the animals.")
game.splash("Press \"A\" to catch the ", "garbage, \"Arrow key\" to ")
game.splash("aim ,if you hit a ", "animal with \"a\" you will ")
game.splash("lose a life garbage will ", "give you a point if you ")
game.splash("capture it, Press \"B\" ", "to rescue the animal ")
game.splash("rescue  10 and you will ", " earn a life when you hit ")
game.splash("it with \"B\" ,that ", "counts as a rescue.")
game.splash("If Player gets a clock,", " the Timer will be reset.")
game.splash("Collect 100 garbage", "To Win the game!")
info.setScore(0)
info.setLife(5)
tiles.setTilemap(tilemap`level2`)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.y += 20
setShipGraphics()
controller.moveSprite(mySprite, 50, 50)
scene.cameraFollowSprite(mySprite)
current_shipMode = 0
ship_border = 70
submarin_border = 120
for (let index = 0; index < 5; index++) {
    MyTreasure = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Treasure)
}
for (let index = 0; index < 16; index++) {
    myAnimal = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Animal)
}
for (let index = 0; index < 150; index++) {
    myGarbage = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Garbage)
}
mydirection = 0
rescuecount = 0
resetcountdown()
game.onUpdate(function () {
    setShipGraphics()
})
game.onUpdateInterval(2000, function () {
    myAnimal = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Animal)
})
forever(function () {
    if (info.score() >= 100) {
        game.over(true, effects.clouds)
    }
})
