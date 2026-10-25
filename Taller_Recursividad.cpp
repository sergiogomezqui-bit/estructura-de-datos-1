// Taller de Recursividad - Estructuras de Datos y Algoritmos 1
// Sergio Gómez - UAO
// Todas las funciones son recursivas (sin for ni while).
#include <iostream>
#include <string>
#include <vector>
#include <cassert>
using namespace std;

// Invierte una cadena: ultimo caracter + inversion del resto
string invertirCadena(const string& s) {
    if (s.size() <= 1) return s;
    return invertirCadena(s.substr(1)) + s[0];
}

// Invierte un arreglo en su sitio intercambiando los extremos
void invertirArreglo(vector<int>& a, int i, int j) {
    if (i >= j) return;
    int t = a[i];
    a[i] = a[j];
    a[j] = t;
    invertirArreglo(a, i + 1, j - 1);
}

// Recorrido: imprime los elementos desde la posicion i
void imprimirArreglo(const vector<int>& a, size_t i) {
    if (i >= a.size()) { cout << endl; return; }
    cout << a[i] << (i + 1 < a.size() ? " " : "");
    imprimirArreglo(a, i + 1);
}

// Recorrido: suma de los elementos desde la posicion i
int sumaArreglo(const vector<int>& a, size_t i) {
    if (i >= a.size()) return 0;
    return a[i] + sumaArreglo(a, i + 1);
}

// Recorrido: mayor elemento desde la posicion i (arreglo no vacio)
int mayorArreglo(const vector<int>& a, size_t i) {
    if (i + 1 == a.size()) return a[i];
    int m = mayorArreglo(a, i + 1);
    return a[i] > m ? a[i] : m;
}

// Potencia por exponenciacion rapida; admite exponente negativo
double potencia(double base, int exp) {
    if (exp == 0) return 1.0;
    if (exp < 0) return 1.0 / potencia(base, -exp);
    double mitad = potencia(base, exp / 2);
    return (exp % 2 == 0) ? mitad * mitad : mitad * mitad * base;
}

// Cuenta los digitos de un entero (0 tiene un digito)
int contarDigitos(long long n) {
    if (n < 0) return contarDigitos(-n);
    if (n < 10) return 1;
    return 1 + contarDigitos(n / 10);
}

// Suma de los digitos de un entero
int sumaDigitos(long long n) {
    if (n < 0) return sumaDigitos(-n);
    if (n < 10) return (int)n;
    return (int)(n % 10) + sumaDigitos(n / 10);
}

int main() {
    assert(invertirCadena("") == "");
    assert(invertirCadena("a") == "a");
    assert(invertirCadena("recursion") == "noisrucer");

    vector<int> v = {1, 2, 3, 4, 5};
    invertirArreglo(v, 0, (int)v.size() - 1);
    assert((v == vector<int>{5, 4, 3, 2, 1}));
    vector<int> par = {1, 2, 3, 4};
    invertirArreglo(par, 0, 3);
    assert((par == vector<int>{4, 3, 2, 1}));

    assert(sumaArreglo(v, 0) == 15);
    assert(sumaArreglo(vector<int>{}, 0) == 0);
    assert(mayorArreglo(vector<int>{3, 9, -2, 7}, 0) == 9);
    assert(mayorArreglo(vector<int>{-5, -1, -8}, 0) == -1);

    assert(potencia(2, 0) == 1.0);
    assert(potencia(2, 10) == 1024.0);
    assert(potencia(3, 5) == 243.0);
    assert(potencia(2, -2) == 0.25);

    assert(contarDigitos(0) == 1);
    assert(contarDigitos(9) == 1);
    assert(contarDigitos(12345) == 5);
    assert(contarDigitos(-1000) == 4);
    assert(sumaDigitos(12345) == 15);

    cout << "Invertir 'recursion': " << invertirCadena("recursion") << endl;
    cout << "Arreglo invertido: ";
    imprimirArreglo(v, 0);
    cout << "Suma: " << sumaArreglo(v, 0) << endl;
    cout << "2^10 = " << potencia(2, 10) << endl;
    cout << "Digitos de 12345: " << contarDigitos(12345) << endl;
    cout << "Todas las pruebas pasaron" << endl;
    return 0;
}
