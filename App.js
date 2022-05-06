import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import CoeffInput from "./src/components/CoeffInput";

export default function App() {
  const [A, setA] = React.useState(0);
  const [B, setB] = React.useState(0);
  const [C, setC] = React.useState(0);
  const [D, setD] = React.useState(0);
  const [E, setE] = React.useState(0);
  const [F, setF] = React.useState(0);
  const [result, setResult] = React.useState(<View></View>);

  return (
    <ScrollView style={styles.appContainer}>
      <Text style={styles.headerText}>Решение уравнений вида:</Text>
      <View style={styles.equalityContainer}>
        <Text style={styles.plainText}>a&middot;x</Text>
        <Text style={styles.superscript}>5</Text>
        <Text style={styles.plainText}> + b&middot;x</Text>
        <Text style={styles.superscript}>4</Text>
        <Text style={styles.plainText}> + c&middot;x</Text>
        <Text style={styles.superscript}>3</Text>
        <Text style={styles.plainText}> + d&middot;x</Text>
        <Text style={styles.superscript}>2</Text>
        <Text style={styles.plainText}> + e&middot;x + f = 0</Text>
      </View>
      <View>
        <CoeffInput name="A" onChangeText={setA} value={A} />
        <CoeffInput name="B" onChangeText={setB} value={B} />
        <CoeffInput name="C" onChangeText={setC} value={C} />
        <CoeffInput name="D" onChangeText={setD} value={D} />
        <CoeffInput name="E" onChangeText={setE} value={E} />
        <CoeffInput name="F" onChangeText={setF} value={F} />
      </View>
      <TouchableOpacity
        title="Решить уравнение"
        onPress={() => setResult(soll(A, B, C, D, E, F))}
        style={styles.solveButton}
      >
        <Text style={styles.plainText}>Решить уравнение</Text>
      </TouchableOpacity>
        {result}
        <View style={{height:200}}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    width:"100%",
    height:"100%",
    paddingTop:"10%",
    backgroundColor: "lightblue",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: { fontSize: 30 },
  plainText: { fontSize: 20, lineHeight: 40 },
  superscript: {
    fontSize: 20 * 0.6,
    lineHeight: 20 * 1.1,
    textAlignVertical: "top",
  },
  subscript: {
    fontSize: 20 * 0.6,
    lineHeight: 20 * 1.1,
    textAlignVertical: "bottom",
  },
  equalityContainer: { display: "flex", flexDirection: "row", justifyContent:"center" },
  solveButton: { backgroundColor: "yellow", padding: 20,width:"80%",textAlign:"center",alignSelf:"center" }
});

function soll(a, b, c, d, e, f) {
  for(let i=0;i<arguments.length;i++){
    if (arguments[i]===""){arguments[i]=0}
  }
  if (a == 0) {
    if (b == 0) {
      if (c == 0) {
        if (d == 0) {
          return solution1(e, f);
        } else {
          return solution2(d, e, f);
        }
      } else {
        return solution3(c, d, e, f);
      }
    } else {
      return solution4(b, c, d, e, f);
    }
  } else {
    return solution5(a, b, c, d, e, f);
  }
}

function solution1(a, b) {
  var sb;
  if (b < 0) sb = "- " + -b;
  else
	sb = "+ " + b;
  return (
    <View>
      <Text style={styles.plainText}>Уравнение 1-й степени</Text>
      <View style={styles.equalityContainer}>
      <Text style={styles.plainText}>
        {a}&middot;x{sb}=0
      </Text>
      </View>
      <Text style={styles.plainText}>Решение:</Text>
      <View style={styles.equalityContainer}>
        <Text style={styles.plainText}>x</Text>
        <Text style={styles.subscript}>1</Text>
        <Text style={styles.plainText}>=</Text>
        <Text style={styles.plainText}>{-b / a}</Text>
      </View>
    </View>
  );
}

function solution2(a, b, c) {
  var sb, sc;
  if (b < 0) sb = "- " + -b;
  else sb = "+ " + b;
  if (c < 0) sc = "- " + -c;
  else sc = "+ " + c;
  var d = b * b - 4 * a * c;
  let result;
  if (d < 0) {
    result = <Text style={styles.plainText}>Действительных корней нет</Text>;
  } else {
    if (d == 0) {
      result = (
        <View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>1</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{-b / (2 * a)}</Text>
          </View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>2</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{-b / (2 * a)}</Text>
          </View>
        </View>
      );
    } else {
      result = (
        <View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>1</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{-b / (2 * a) - Math.sqrt(d) / (2 * a)}</Text>
          </View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>2</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{-b / (2 * a) + Math.sqrt(d) / (2 * a)}</Text>
          </View>
        </View>
      );
    }
  }
  return (
    <View>
      <Text style={styles.plainText}>Уравнение 2-й степени:</Text>
      <View style={styles.equalityContainer}>
      <Text style={styles.plainText}>
        {a}&middot;x&sup2;{sb}&middot;x{sc}=0
      </Text>
      </View>
      <Text style={styles.plainText}>Решение:</Text>
      {result}
    </View>
  );
}

function solution3(d, a, b, c) {
  var sa, sc, sb;
  if (b < 0) sb = "- " + -b;
  else sb = "+ " + b;
  if (c < 0) sc = "- " + -c;
  else sc = "+ " + c;
  if (a < 0) sa = "- " + -a;
  else sa = "+ " + a;
  a /= d;
  b /= d;
  c /= d;
  //Решение уравнения x^3+ax^2+bx+c=0, используя формулу Кардано
  var q = (a * a - 3 * b) / 9;
  var r = (2 * a * a * a - 9 * a * b + 27 * c) / 54;
  let result;
  if (r * r <= q * q * q) {
    if (q == 0) {
      var x1 = -a / 3;
      var x2 = -a / 3;
      var x3 = -a / 3;

      result = (
        <View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>1</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x1}</Text>
          </View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>2</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x2}</Text>
          </View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>3</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x3}</Text>
          </View>
        </View>
      );
    } else {
      var t = Math.acos(r / Math.sqrt(q * q * q)) / 3;
      var x1 = -2 * Math.sqrt(q) * Math.cos(t) - a / 3;
      var x2 = -2 * Math.sqrt(q) * Math.cos(t + (2 * Math.PI) / 3) - a / 3;
      var x3 = -2 * Math.sqrt(q) * Math.cos(t - (2 * Math.PI) / 3) - a / 3;

      result = (
        <View>
        <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>1</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x1}</Text>
          </View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>2</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x2}</Text>
          </View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>3</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x3}</Text>
          </View>
        </View>
      );
    }
  } else {
    if (r < 0) r *= -1;
    var aa = -Math.pow(r + Math.sqrt(r * r - q * q * q), 1 / 3);
    var bb;
    if (aa != 0) bb = q / aa;
    else bb = 0;
    a /= 3;
    q = aa + bb;
    r = aa - bb;
    x1 = q - a;
    result = (
      <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>1</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x1}</Text>
          </View>
    );
    if (aa == bb) {
      x2 = -aa - a;
      result = (<View>
        <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>1</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x1}</Text>
          </View>
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>2</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x2}</Text>
          </View>
          </View>
      );
    }
  }
  return (
    <View>
      <Text style={styles.plainText}>Уравнение 3-й степени:</Text>
      <View style={styles.equalityContainer}>
        <Text style={styles.plainText}>{d}&middot;x</Text>
        <Text style={styles.superscript}>3</Text>
        <Text style={styles.plainText}> + {a * d * 3}&middot;x</Text>
        <Text style={styles.superscript}>2</Text>
        <Text style={styles.plainText}> + {b * d}&middot;x</Text>
        <Text style={styles.plainText}> + {c * d} = 0</Text>
      </View>
      <Text style={styles.plainText}>Решение:</Text>
      {result}
    </View>
  );
}

function solution4(a, b, c, d, e) {
  var sb, sc, sd, se;
  if (b < 0) sb = "- " + -b;
  else sb = "+ " + b;
  if (c < 0) sc = "- " + -c;
  else sc = "+ " + c;
  if (d < 0) sd = "- " + -d;
  else sd = "+ " + d;
  if (c < 0) se = "- " + -e;
  else se = "+ " + e;
  let result;

  //Решение уравнения 4й степени, используя метод Феррари
  var alfa = (-3 * b * b) / 8 / a / a + c / a;
  var beta = (b * b * b) / 8 / a / a / a - (b * c) / 2 / a / a + d / a;
  var gamma =
    (-3 * Math.pow(b, 4)) / 256 / Math.pow(a, 4) +
    (b * b * c) / 16 / a / a / a -
    (b * d) / 4 / a / a +
    e / a;
  var x1, x2, x3, x4;
  if (beta == 0) {
    x1 =
      -b / 4 / a + Math.sqrt((-alfa + Math.sqrt(alfa * alfa - 4 * gamma)) / 2);
    x2 =
      -b / 4 / a + Math.sqrt((-alfa - Math.sqrt(alfa * alfa - 4 * gamma)) / 2);
    x3 =
      -b / 4 / a - Math.sqrt((-alfa + Math.sqrt(alfa * alfa - 4 * gamma)) / 2);
    x4 =
      -b / 4 / a - Math.sqrt((-alfa - Math.sqrt(alfa * alfa - 4 * gamma)) / 2);
    if (isNaN(x1)) x1 = "";
    if (isNaN(x2)) x2 = "";
    if (isNaN(x3)) x3 = "";
    if (isNaN(x4)) x4 = "";
    if (x1 == "" && x2 == "" && x3 == "" && x4 == "")
      result = <Text style={styles.plainText}>Действительных корней нет</Text>;
    else {
      let result1 = <View />,
        result2 = <View />,
        result3 = <View />,
        result4 = <View />;
      let i = 1;
      if (x1 != "") {
        result1 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x1}</Text>
          </View>
        );
        i++;
      }
      if (x2 != "") {
        result2 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x2}</Text>
          </View>
        );
        i++;
      }
      if (x3 != "") {
        result3 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x3}</Text>
          </View>
        );
        i++;
      }
      if (x4 != "")
        result4 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x4}</Text>
          </View>
        );
      result = (
        <View>
          {result1}
          {result2}
          {result3}
          {result4}
        </View>
      );
    }
  } else {
    var P = (-alfa * alfa) / 12 - gamma;
    var Q =
      (-alfa * alfa * alfa) / 108 + (alfa * gamma) / 3 - (beta * beta) / 8;
    var R = -Q / 2 + Math.sqrt((Q * Q) / 4 + (P * P * P) / 27);
    var U = Math.pow(R, 1 / 3);
    var y = 0;
    if (U == 0) {
      y = (-5 / 6) * alfa + U - Math.pow(Q, 1 / 3);
    } else {
      y = (-5 / 6) * alfa + U - P / 3 / U;
    }
    var W = Math.sqrt(alfa + 2 * y);
    x1 = -b / 4 / a + (W + Math.sqrt(-(3 * alfa + 2 * y + (2 * beta) / W))) / 2;
    x2 = -b / 4 / a + (W - Math.sqrt(-(3 * alfa + 2 * y + (2 * beta) / W))) / 2;
    x3 =
      -b / 4 / a + (-W + Math.sqrt(-(3 * alfa + 2 * y - (2 * beta) / W))) / 2;
    x4 =
      -b / 4 / a + (-W - Math.sqrt(-(3 * alfa + 2 * y - (2 * beta) / W))) / 2;
    if (isNaN(x1)) x1 = "";
    if (isNaN(x2)) x2 = "";
    if (isNaN(x3)) x3 = "";
    if (isNaN(x4)) x4 = "";
    if (x1 == "" && x2 == "" && x3 == "" && x4 == "")
      result = <Text style={styles.plainText}>Действительных корней нет</Text>;
    else {
      let i = 1;
      let result1 = <View />,
        result2 = <View />,
        result3 = <View />,
        result4 = <View />;
      if (x1 != "") {
        result1 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x1}</Text>
          </View>
        );
        i++;
      }
      if (x2 != "") {
        result2 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x2}</Text>
          </View>
        );
        i++;
      }
      if (x3 != "") {
        result3 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x3}</Text>
          </View>
        );
        i++;
      }
      if (x4 != "") {
        result4 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x4}</Text>
          </View>
        );
      }
      result = (
        <View>
          {result1}
          {result2}
          {result3}
          {result4}
        </View>
      );
    }
  }
  return (
    <View>
      <Text style={styles.plainText}>Уравнение 4-й степени:</Text>
      <View style={styles.equalityContainer}>
        <Text style={styles.plainText}>{a}&middot;x</Text>
        <Text style={styles.superscript}>4</Text>
        <Text style={styles.plainText}>{sb}&middot;x</Text>
        <Text style={styles.superscript}>3</Text>
        <Text style={styles.plainText}>{sc}&middot;x</Text>
        <Text style={styles.superscript}>2</Text>
        <Text style={styles.plainText}>{sd}&middot;x</Text>
        <Text style={styles.plainText}>{se} = 0</Text>
      </View>
      <Text style={styles.plainText}>Решение:</Text>
      {result}
    </View>
  );
}

function solution4_5(a, b, c, d, e, x5) {
  let result;
  var sb, sc, sd, se;
  if (b < 0) sb = "- " + -b;
  else sb = "+ " + b;
  if (c < 0) sc = "- " + -c;
  else sc = "+ " + c;
  if (d < 0) sd = "- " + -d;
  else sd = "+ " + d;
  if (c < 0) se = "- " + -e;
  else se = "+ " + e;

  var alfa = (-3 * b * b) / 8 / a / a + c / a;
  var beta = (b * b * b) / 8 / a / a / a - (b * c) / 2 / a / a + d / a;
  var gamma =
    (-3 * Math.pow(b, 4)) / 256 / Math.pow(a, 4) +
    (b * b * c) / 16 / a / a / a -
    (b * d) / 4 / a / a +
    e / a;
  var x1, x2, x3, x4;
  if (beta == 0) {
    x1 =
      -b / 4 / a + Math.sqrt((-alfa + Math.sqrt(alfa * alfa - 4 * gamma)) / 2);
    x2 =
      -b / 4 / a + Math.sqrt((-alfa - Math.sqrt(alfa * alfa - 4 * gamma)) / 2);
    x3 =
      -b / 4 / a - Math.sqrt((-alfa + Math.sqrt(alfa * alfa - 4 * gamma)) / 2);
    x4 =
      -b / 4 / a - Math.sqrt((-alfa - Math.sqrt(alfa * alfa - 4 * gamma)) / 2);
    if (isNaN(x1)) x1 = "";
    if (isNaN(x2)) x2 = "";
    if (isNaN(x3)) x3 = "";
    if (isNaN(x4)) x4 = "";
    if (x1 == "" && x2 == "" && x3 == "" && x4 == "" && x5 == "")
      result = <Text style={styles.plainText}>Действительных корней нет</Text>;
    else {
      let i = 2;
      let result1 = <View />,
        result2 = <View />,
        result3 = <View />,
        result4 = <View />;
      if (x1 != "") {
        result1 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x1}</Text>
          </View>
        );
        i++;
      }
      if (x2 != "") {
        result2 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x2}</Text>
          </View>
        );
        i++;
      }
      if (x3 != "") {
        result3 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x3}</Text>
          </View>
        );
        i++;
      }
      if (x4 != "") {
        result4 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x4}</Text>
          </View>
        );
        i++;
      }
      result = (
        <View>
          {result1}
          {result2}
          {result3}
          {result4}
        </View>
      );
    }
  } else {
    var P = (-alfa * alfa) / 12 - gamma;
    var Q =
      (-alfa * alfa * alfa) / 108 + (alfa * gamma) / 3 - (beta * beta) / 8;
    var R = -Q / 2 + Math.sqrt((Q * Q) / 4 + (P * P * P) / 27);
    var U = Math.pow(R, 1 / 3);
    var y = 0;
    if (U == 0) {
      y = (-5 / 6) * alfa + U - Math.pow(Q, 1 / 3);
    } else {
      y = (-5 / 6) * alfa + U - P / 3 / U;
    }
    var W = Math.sqrt(alfa + 2 * y);
    x1 = -b / 4 / a + (W + Math.sqrt(-(3 * alfa + 2 * y + (2 * beta) / W))) / 2;
    x2 = -b / 4 / a + (W - Math.sqrt(-(3 * alfa + 2 * y + (2 * beta) / W))) / 2;
    x3 =
      -b / 4 / a + (-W + Math.sqrt(-(3 * alfa + 2 * y - (2 * beta) / W))) / 2;
    x4 =
      -b / 4 / a + (-W - Math.sqrt(-(3 * alfa + 2 * y - (2 * beta) / W))) / 2;
    if (isNaN(x1)) x1 = "";
    if (isNaN(x2)) x2 = "";
    if (isNaN(x3)) x3 = "";
    if (isNaN(x4)) x4 = "";
    if (x1 == "" && x2 == "" && x3 == "" && x4 == "" && x5 == "")
      result = <Text style={styles.plainText}>Действительных корней нет</Text>;
    else {
      let i = 2;
      let result1 = <View />,
        result2 = <View />,
        result3 = <View />,
        result4 = <View />;
      if (x1 != "") {
        result1 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x1}</Text>
          </View>
        );
        i++;
      }
      if (x2 != "") {
        result2 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x2}</Text>
          </View>
        );
        i++;
      }
      if (x3 != "") {
        result3 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x3}</Text>
          </View>
        );
        i++;
      }
      if (x4 != "") {
        result4 = (
          <View style={styles.equalityContainer}>
            <Text style={styles.plainText}>x</Text>
            <Text style={styles.subscript}>{i}</Text>
            <Text style={styles.plainText}>=</Text>
            <Text style={styles.plainText}>{x4}</Text>
          </View>
        );
        i++;
      }
      result = (
        <View>
          {result1}
          {result2}
          {result3}
          {result4}
        </View>
      );
    }
  }
  return (
    <View>
      <View style={styles.equalityContainer}>
        <Text style={styles.plainText}>x</Text>
        <Text style={styles.subscript}>{1}</Text>
        <Text style={styles.plainText}>=</Text>
        <Text style={styles.plainText}>{x5}</Text>
      </View>
      {result}
    </View>
  );
}

function solution5(a, b, c, d, e, f) {
  let result;
  var sb, sc, sd, se, sf;
  if (b < 0) sb = "- " + -b;
  else sb = "+ " + b;
  if (c < 0) sc = "- " + -c;
  else sc = "+ " + c;
  if (d < 0) sd = "- " + -d;
  else sd = "+ " + d;
  if (c < 0) se = "- " + -e;
  else se = "+ " + e;
  if (f < 0) sf = "- " + -f;
  else sf = "+ " + f;
  if (f == 0) {
    var x5 = 0;
    result = solution4_5(a, b, c, d, e, x5);
  } else {
    if (b == 0 && c == 0 && d == 0 && e == 0) {
      var resh = -f / a;
      if (resh < 0) resh = -Math.pow(-resh, 0.2);
      else resh = Math.pow(resh, 0.2);
      result = (
        <View style={styles.equalityContainer}>
          <Text style={styles.plainText}>x</Text>
          <Text style={styles.subscript}>{1}</Text>
          <Text style={styles.plainText}>=</Text>
          <Text style={styles.plainText}>{resh}</Text>
        </View>
      );
    } else result = <Text style={styles.plainText}>Алгоритма решения нет</Text>;
  }
  return (
    <View>
      <Text style={styles.plainText}>Уравнение 5-й степени:</Text>
      <View style={styles.equalityContainer}>
        <Text style={styles.plainText}>{a}&middot;x</Text>
        <Text style={styles.superscript}>5</Text>
        <Text style={styles.plainText}>{sb}&middot;x</Text>
        <Text style={styles.superscript}>4</Text>
        <Text style={styles.plainText}>{sc}&middot;x</Text>
        <Text style={styles.superscript}>3</Text>
        <Text style={styles.plainText}>{sd}&middot;x</Text>
        <Text style={styles.superscript}>2</Text>
        <Text style={styles.plainText}>{se}&middot;x</Text>
        <Text style={styles.plainText}>{sf} = 0</Text>
      </View>
      <Text style={styles.plainText}>Решение:</Text>
      {result}
    </View>
  );
}
