// Taller de Ordenamiento y Busqueda - Estructuras de Datos y Algoritmos 1
// Sergio Gómez - UAO
// MergeSort, QuickSort y Busqueda Binaria, todos recursivos (sin for ni while).
#include <iostream>
#include <vector>
#include <cassert>
using namespace std;

// ---------- MergeSort ----------
// Mezcla recursiva de a[i..mi] y a[mj..fin] en 'out' (parte desde out vacio)
void mezclar(const vector<int>& a, int i, int mi, int j, int fin, vector<int>& out) {
    if (i > mi && j > fin) return;
    if (j > fin || (i <= mi && a[i] <= a[j])) {
        out.push_back(a[i]);
        mezclar(a, i + 1, mi, j, fin, out);
    } else {
        out.push_back(a[j]);
        mezclar(a, i, mi, j + 1, fin, out);
    }
}

// Copia recursiva de tmp en a desde la posicion ini
void copiar(const vector<int>& tmp, vector<int>& a, int ini, int k) {
    if (k >= (int)tmp.size()) return;
    a[ini + k] = tmp[k];
    copiar(tmp, a, ini, k + 1);
}

void mergeSort(vector<int>& a, int izq, int der) {
    if (izq >= der) return;
    int mid = izq + (der - izq) / 2;
    mergeSort(a, izq, mid);
    mergeSort(a, mid + 1, der);
    vector<int> tmp;
    mezclar(a, izq, mid, mid + 1, der, tmp);
    copiar(tmp, a, izq, 0);
}

// ---------- QuickSort ----------
void intercambiar(vector<int>& a, int i, int j) {
    int t = a[i]; a[i] = a[j]; a[j] = t;
}

// Particion de Lomuto recursiva: recorre j de ini a fin-1, 'p' es la frontera
int particionar(vector<int>& a, int j, int fin, int p) {
    if (j >= fin) {
        intercambiar(a, p, fin);
        return p;
    }
    if (a[j] < a[fin]) {
        intercambiar(a, p, j);
        return particionar(a, j + 1, fin, p + 1);
    }
    return particionar(a, j + 1, fin, p);
}

void quickSort(vector<int>& a, int izq, int der) {
    if (izq >= der) return;
    int p = particionar(a, izq, der, izq);
    quickSort(a, izq, p - 1);
    quickSort(a, p + 1, der);
}

// ---------- Busqueda binaria ----------
// Devuelve la posicion de x en a[izq..der] ordenado, o -1 si no esta
int busquedaBinaria(const vector<int>& a, int x, int izq, int der) {
    if (izq > der) return -1;
    int mid = izq + (der - izq) / 2;
    if (a[mid] == x) return mid;
    if (a[mid] < x) return busquedaBinaria(a, x, mid + 1, der);
    return busquedaBinaria(a, x, izq, mid - 1);
}

void imprimir(const vector<int>& a, size_t i) {
    if (i >= a.size()) { cout << endl; return; }
    cout << a[i] << (i + 1 < a.size() ? " " : "");
    imprimir(a, i + 1);
}

int main() {
    vector<int> m = {38, 27, 43, 3, 9, 82, 10, 3};
    vector<int> q = m;
    vector<int> esperado = {3, 3, 9, 10, 27, 38, 43, 82};

    mergeSort(m, 0, (int)m.size() - 1);
    quickSort(q, 0, (int)q.size() - 1);
    assert(m == esperado);
    assert(q == esperado);

    vector<int> vacio;
    mergeSort(vacio, 0, -1);
    quickSort(vacio, 0, -1);
    vector<int> uno = {7};
    mergeSort(uno, 0, 0);
    assert(uno[0] == 7);
    vector<int> inv = {5, 4, 3, 2, 1};
    quickSort(inv, 0, 4);
    assert((inv == vector<int>{1, 2, 3, 4, 5}));

    assert(busquedaBinaria(esperado, 43, 0, 7) == 6);
    assert(busquedaBinaria(esperado, 3, 0, 7) != -1);
    assert(busquedaBinaria(esperado, 5, 0, 7) == -1);
    assert(busquedaBinaria(vacio, 1, 0, -1) == -1);

    cout << "MergeSort: "; imprimir(m, 0);
    cout << "QuickSort: "; imprimir(q, 0);
    cout << "Posicion de 43: " << busquedaBinaria(esperado, 43, 0, 7) << endl;
    cout << "Todas las pruebas pasaron" << endl;
    return 0;
}
