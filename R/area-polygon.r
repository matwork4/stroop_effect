### See https://en.wikipedia.org/wiki/Polygon#Area

area.polygon <- function (x, y) {
    n <- length (x)
    return (abs (sum (x [1 : (n - 1)] * y [2 : n]
                      - x [2 : n] * y [1 : (n - 1)])) / 2)
}
