#ifndef ADJMAT_H
#define ADJMAT_H

#include <vector>

using namespace std;

class AdjMat
{
public:
	AdjMat(){}
	~AdjMat(){}
	void handler(int &N, vector<vector<vector<int>>> &group);
	void getMat();

private:
	// number of vertices
	int N;
	bool** mat;
	
};

#endif